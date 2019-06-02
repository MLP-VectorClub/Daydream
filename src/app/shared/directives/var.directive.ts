import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appVar]' })
export class VarDirective {
  @Input()
  set appVar(context: any) {
    this.context.$implicit = this.context.appVar = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {
  }

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
