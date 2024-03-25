import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TableModule } from 'primeng/table';

const ngprimeModule = [
  TableModule
]

@NgModule({
    declarations: [],
    imports: [ CommonModule, ...ngprimeModule ],
    exports: ngprimeModule
})
export class NgprimeModule {}