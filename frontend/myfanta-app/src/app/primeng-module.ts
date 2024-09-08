import { NgModule } from "@angular/core";

import { AnimateModule } from "primeng/animate";
import { ButtonModule } from "primeng/button";
import { DeferModule } from "primeng/defer";
import { ImageModule } from "primeng/image";
import { PanelModule } from "primeng/panel";

@NgModule({
    exports: [
        AnimateModule,
        ButtonModule,
        DeferModule,
        ImageModule,
        PanelModule
    ]
})
export class PrimeNgModule {}