import { ISpaceForm } from './models/spaceForm';

import {
    Component,
    Input,
    Output,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
    TemplateRef,
} from '@angular/core';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import {
    WizardConfig,
    WizardComponent,
    WizardEvent,
    WizardStepConfig
} from 'patternfly-ng';

import { TabDirective } from 'ngx-bootstrap/tabs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'ofs-space-wizard',
    templateUrl: './space-wizard.component.html',
    styleUrls: ['./space-wizard.component.scss'],
})
export class SpaceWizardComponent implements OnInit {

    @ViewChild('wizardTemplate')
    public wizardTemplate: TemplateRef<any>;

    public acceptTermsConditions = false;
    public spaceForm: ISpaceForm = null;

    public claimComplete: boolean = true;

    // Wizard
    public wizardConfig: WizardConfig;

    // Wizard Step 1
    public stepSpaceConfig: WizardStepConfig;
    public stepSpaceTermsConditionsConfig: WizardStepConfig;
    public stepSpaceInfoConfig: WizardStepConfig;

    // Wizard Step 2
    public stepClaimConfig: WizardStepConfig;
    public stepClaimReviewConfig: WizardStepConfig;
    public stepClaimResultConfig: WizardStepConfig;

    // Modal
    private modalRef: BsModalRef;

    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder) { }

    public ngOnInit() {
        // Wizard
        this.wizardConfig = {
            title: 'Claim Space'
        } as WizardConfig;

        // Step Space
        this.stepSpaceConfig = {
            id: 'stepSpace',
            priority: 0,
            title: 'Space'
        } as WizardStepConfig;

        this.stepSpaceTermsConditionsConfig = {
            id: 'stepSpaceTermsConditions',
            expandReviewDetails: true,
            nextEnabled: false,
            allowNavAway: false,
            allowClickNav: false,
            priority: 0,
            title: 'Terms & Conditions'
        } as WizardStepConfig;
        this.stepSpaceInfoConfig = {
            id: 'stepSpaceInfo',
            expandReviewDetails: true,
            allowClickNav: false,
            priority: 1,
            title: 'Space Data'
        } as WizardStepConfig;

        // Step 3
        this.stepClaimConfig = {
            id: 'stepClaim',
            priority: 2,
            title: 'Review'
        } as WizardStepConfig;
        this.stepClaimReviewConfig = {
            id: 'stepClaimReview',
            priority: 0,
            title: 'Summary'
        } as WizardStepConfig;
        this.stepClaimResultConfig = {
            id: 'stepClaimResult',
            priority: 1,
            title: 'Claim'
        } as WizardStepConfig;
    }

    /**
     * Open modal
     * @param options
     */
    public open(options?: any) {
        const defaultOptions = { class: 'modal-lg' };
        this.modalRef = this.modalService.show(this.wizardTemplate, options || defaultOptions);
    }

    /**
     * Close modal
     */
    public close() {
        this.modalRef.hide();
    }

    // Methods
    public nextClicked($event: WizardEvent): void {
        if ($event.step.config.id === 'stepClaimResult') {
            this.close();
        }
    }

    public stepChanged($event: WizardEvent) {
        if ($event.step.config.id === 'stepSpaceTermsConditions') {
            this.stepSpaceTermsConditionsRefresh();
        } else if ($event.step.config.id === 'stepSpaceInfo') {
            this.stepSpaceInfoRefresh();
        } else if ($event.step.config.id === 'stepClaimReview') {
            this.wizardConfig.nextTitle = 'Claim';
        } else if ($event.step.config.id === 'stepClaimResult') {
            this.wizardConfig.nextTitle = 'Close';
        } else {
            this.wizardConfig.nextTitle = 'Next >';
        }
    }

    public startClaim(): void {
        this.claimComplete = false;
        this.wizardConfig.done = true;

        // Simulate a delay
        setTimeout(() => {
            this.claimComplete = true;
        }, 2500);
    }

    /*
   * Creates a persistent collaboration space
   * by invoking the spaceService
   */
    public createSpace() {
    }

    public changeAcceptTermsConditions($event: boolean) {
        this.acceptTermsConditions = $event;
        this.stepSpaceTermsConditionsRefresh();
    }

    public changeSpaceForm($event: ISpaceForm) {
        this.spaceForm = $event;
        this.stepSpaceInfoRefresh();
    }

    private stepSpaceTermsConditionsRefresh() {
        this.stepSpaceTermsConditionsConfig.nextEnabled
            = this.stepSpaceTermsConditionsConfig.allowNavAway
            = this.acceptTermsConditions;
    }

    private stepSpaceInfoRefresh() {
        this.stepSpaceInfoConfig.nextEnabled
            = this.stepSpaceInfoConfig.allowNavAway
            = !(this.spaceForm == null);
    }

}
