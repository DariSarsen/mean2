import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatTreeModule } from '@angular/material/tree';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    // MatRadioModule,
    // MatSidenavModule,
    // MatListModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatGridListModule,
    // MatTreeModule,
    // DragDropModule,
    // MatSlideToggleModule
  ]
  
})
export class MaterialModule {}
