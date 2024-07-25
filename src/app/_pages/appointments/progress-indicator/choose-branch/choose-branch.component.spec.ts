import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBranchComponent } from './choose-branch.component';

describe('ChooseBranchComponent', () => {
  let component: ChooseBranchComponent;
  let fixture: ComponentFixture<ChooseBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseBranchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
