import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  let component: AbilityRollerComponent;
  let fixture: ComponentFixture<AbilityRollerComponent>;
  let diceServiceSpy: jasmine.SpyObj<DiceService>;

  beforeEach(async () => {
    diceServiceSpy = jasmine.createSpyObj('DiceService', ['roll']);

    await TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: DiceService,
          useValue: diceServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                sides: '6'
              })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the spied DiceService when rolling', () => {
    diceServiceSpy.roll.and.returnValue(4);

    component.rollAbility();

    expect(diceServiceSpy.roll).toHaveBeenCalledWith(6);
    expect(component.result).toBe(4);
  });

  it('should default invalid route input to 6 and warn once', () => {
    const warnSpy = spyOn(console, 'warn');

    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: DiceService,
          useValue: diceServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                sides: 'invalid'
              })
            }
          }
        }
      ]
    });

    const invalidFixture =
      TestBed.createComponent(AbilityRollerComponent);

    const invalidComponent = invalidFixture.componentInstance;

    expect(invalidComponent.sides).toBe(6);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
