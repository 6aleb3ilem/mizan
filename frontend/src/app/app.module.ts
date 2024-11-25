import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Page1Component } from './page1/page1.component';
import { TacheComponent } from './tache/tache.component';
import { ItemComponent } from './item/item.component';
import { DevisComponent } from './devis/devis.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { ProjetComponent } from './projets/projet.component';
import { ModaladdtacheComponent } from './tache/modaladdtache/modaladdtache.component';
import { ModalupdatetacheComponent } from './tache/modalupdatetache/modalupdatetache.component';
import { ModaladditemComponent } from './item/modaladditem/modaladditem.component';
import { ModalupdateitemComponent } from './item/modalupdateitem/modalupdateitem.component';
import { ModaladddevisComponent } from './devis/modaladddevis/modaladddevis.component';
import { ModalupdatedevisComponent } from './devis/modalupdatedevis/modalupdatedevis.component';
import { ModalupdateclientComponent } from './client/modalupdateclient/modalupdateclient.component';
import { ModaladdclientComponent } from './client/modaladdclient/modaladdclient.component';
import { ModaladdcontactComponent } from './contact/modaladdcontact/modaladdcontact.component';
import { ModalupdatecontactComponent } from './contact/modalupdatecontact/modalupdatecontact.component';
import { ModalupdateprojetComponent } from './projets/modalupdateprojet/modalupdateprojet.component';
import { UsermanegementComponent } from './usermanegement/usermanegement.component';

import { ItemTacheComponent } from './item-tache/item-tache.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ModalupdateitemTacheComponent } from './item-tache/modalupdateitem-tache/modalupdateitem-tache.component';
import { ModaladditemTacheComponent } from './item-tache/modaladditem-tache/modaladditem-tache.component';
import { ModalupdateclientContactComponent } from './client-contact/modalupdateclient-contact/modalupdateclient-contact.component';
import { ModaladdclientcontactComponent } from './client-contact/modaladdclient-contact/modaladdclient-contact.component';
import { ModaldeletetacheComponent } from './tache/modaldeletetache/modaldeletetache.component';
import { ModaldeleteitemComponent } from './item/modaldeleteitem/modaldeleteitem.component';
import { ModaldeletedevisComponent } from './devis/modaldeletedevis/modaldeletedevis.component';
import { ModaldeleteclientComponent } from './client/modaldeleteclient/modaldeleteclient.component';
import { ModaldeletecontactComponent } from './contact/modaldeletecontact/modaldeletecontact.component';
import { ModaldeleteprojetComponent } from './projets/modaldeleteprojet/modaldeleteprojet.component';
import { ModaldeleteitemTacheComponent } from './item-tache/modaldeleteitem-tache/modaldeleteitem-tache.component';
import { ModaldeleteclientContactComponent } from './client-contact/modaldeleteclient-contact/modaldeleteclient-contact.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListeDePrixComponent } from './Liste-prix/ListeDePrix.component';
import { ModalAddListeDePrixComponent } from './Liste-prix/modaladdliste-prix/modal-add-liste-de-prix.component';
import { ModalDeleteListeDePrixComponent } from './Liste-prix/modaldeleteliste-prix/modaldeleteliste-de-prix.component';
import { ModalUpdateListeDePrixComponent } from './Liste-prix/modalupdateliste-prix/modal-update-liste-de-prix.component';
import { DevisEditionComponent } from './devis-edition/devis-edition.component';
import { UniteComponent } from './unite/unite.component';
import { ModaladduniteComponent } from './unite/modaladdunite/modaladdunite.component';
import { ModalupdateuniteComponent } from './unite/modalupdateunite/modalupdateunite.component';
import { ModaldeleteuniteComponent } from './unite/modaldeleteunite/modaldeleteunite.component';
import { TypeComponent } from './type/type.component';
import { ModaladdtypeComponent } from './type/modaladdtype/modaladdtype.component';
import { ModalupdatetypeComponent } from './type/modalupdatetype/modalupdatetype.component';
import { ModaldeletetypeComponent } from './type/modaldeletetype/modaldeletetype.component';
import { ElementComponent } from './element/element.component';
import { ModaldeleteelementComponent } from './element/modaldeleteelement/modaldeleteelement.component';
import { ModalupdateelementComponent } from './element/modalupdateelement/modalupdateelement.component';
import { ModaladdelementComponent } from './element/modaladdelement/modaladdelement.component';
import { TarifComponent } from './tarif/tarif.component';
import { ModaladdtarifComponent } from './tarif/modaladdtarif/modaladdtarif.component';
import { ModalupdatetarifComponent } from './tarif/modalupdatetarif/modalupdatetarif.component';

import { ModaldeletetarifComponent } from './tarif/modaldeletetarif/modaldeletetarif.component';
import { DevisfComponent } from './devisf/devisf.component';
import { DevistacheComponent } from './devistache/devistache.component';
import { ModaladddevistacheComponent } from './devistache/modaladddevistache/modaladddevistache.component';
import { ModalupdatedevistacheComponent } from './devistache/modalupdatedevistache/modalupdatedevistache.component';
import { ModaldeletedevistacheComponent } from './devistache/modaldeletedevistache/modaldeletedevistache.component';
import { ModaldeletedevisfComponent } from './devisf/modaldeletedevisf/modaldeletedevisf.component';
import { ModalupdatedevisfComponent } from './devisf/modalupdatedevisf/modalupdatedevisf.component';
import { ModaladddevisfComponent } from './devisf/modaladddevisf/modaladddevisf.component';
import { ContactProjetComponent } from './contact-projet/contact-projet.component';
import { ModaladdcontactProjetComponent } from './contact-projet/modaladdcontact-projet/modaladdcontact-projet.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportModalComponent } from './unite/import-modal/import-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ImportModaltarifComponent } from './tarif/import-modaltarif/import-modaltarif.component';
import { ImportModalclientComponent } from './client/import-modalclient/import-modalclient.component';
import { ImportModalcontactComponent } from './contact/import-modalcontact/import-modalcontact.component';
import { ImportModalprojetComponent } from './projets/import-modalprojet/import-modalprojet.component';
import { ImportModaltacheComponent } from './tache/import-modaltache/import-modaltache.component';
import { ImportModalelementComponent } from './element/import-modalelement/import-modalelement.component';
import { ImportModalitemComponent } from './item/import-modalitem/import-modalitem.component';
import { FilterByTypePipe } from './filter-by-type.pipe';

import { ModaladdComponent } from './bct/modaladd/modaladd.component';
import { ModaldeleteComponent } from './bct/modaldelete/modaldelete.component';
import { ModalupdateComponent } from './bct/modalupdate/modalupdate.component';
import { BctComponent } from './bct/bct.component';
import { TacherefComponent } from './tacheref/tacheref.component';
import { ModaladdTComponent } from './tacheref/modaladdT/modaladd.component';
import { ModaldeleteTComponent } from './tacheref/modaldeleteT/modaldelete.component';
import { ModalupdateTComponent } from './tacheref/modalupdateT/modalupdate.component';

import { StatusComponent } from './status/status.component';
import { ModaladdstatusComponent } from './status/modaladdstatus/modaladdstatus.component';
import { ModaldeletestatusComponent } from './status/modaldeletestatus/modaldeletestatus.component';
import { ModalupdatestatusComponent } from './status/modalupdatestatus/modalupdatestatus.component';
import { PrioriteComponent } from './priorite/priorite.component';
import { ModalupdateprioriteComponent } from './priorite/modalupdatepriorite/modalupdatepriorite.component';
import { ModaldeleteprioriteComponent } from './priorite/modaldeletepriorite/modaldeletepriorite.component';
import { ModaladdprioriteComponent } from './priorite/modaladdpriorite/modaladdpriorite.component';
import { SituationComponent } from './situation/situation.component';
import { ModalupdatesituationComponent } from './situation/modalupdatesituation/modalupdatesituation.component';
import { ModaldeletesituationComponent } from './situation/modaldeletesituation/modaldeletesituation.component';
import { ModaladdsituationComponent } from './situation/modaladdsituation/modaladdsituation.component';
import { ProfessionComponent } from './profession/profession.component';
import { ModalupdateprofessionComponent } from './profession/modalupdateprofession/modalupdateprofession.component';
import { ModaldeleteprofessionComponent } from './profession/modaldeleteprofession/modaldeleteprofession.component';
import { ModaladdprofessionComponent } from './profession/modaladdprofession/modaladdprofession.component';
import { NavigationService } from './sidebar/navigation.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModaladdprojetComponent } from './projets/modaladdprojet/modaladdprojet.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDuplicateDevisfComponent } from './devisf/modal-duplicate-devisf/modal-duplicate-devisf.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModaladduserComponent } from './usermanegement/modaladduser/modaladduser.component';
import { ModalupdateuserComponent } from './usermanegement/modalupdateuser/modalupdateuser.component';
import { ModaldeleteuserComponent } from './usermanegement/modaldeleteuser/modaldeleteuser.component';
import { SignupComponent } from './signup/signup.component';
import { SendVerificationComponent } from './signup/send-verification/send-verification.component';
import { SetPasswordComponent } from './signup/set-password/set-password.component';
import { VerifyCodeComponent } from './signup/verify-code/verify-code.component';
import { CsrfInterceptor } from './csrf.interceptor'; // Adjust the path as necessary
import { AccueilComponent } from './signup/accueil/accueil.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({

  declarations: [LoginComponent,AccueilComponent,VerifyCodeComponent,SetPasswordComponent,SendVerificationComponent,SignupComponent,ModaldeleteuserComponent,ModalupdateuserComponent,ModaladduserComponent,UsermanegementComponent,DashboardComponent,ModalDuplicateDevisfComponent,ModaladdprojetComponent,ModaldeleteTComponent,ModalupdateTComponent,TacheComponent,TacherefComponent,ModaladdTComponent,BctComponent,ModalupdateComponent,ModaldeleteComponent,ModaladdComponent,ModaladdprofessionComponent,ModaldeleteprofessionComponent,ModalupdateprofessionComponent,ProfessionComponent,ModaladdsituationComponent,ModaldeletesituationComponent,ModalupdatesituationComponent,SituationComponent,ModaladdprioriteComponent,ModaldeleteprioriteComponent,ModalupdateprioriteComponent,PrioriteComponent,ModalupdatestatusComponent,ModaldeletestatusComponent,ModaladdstatusComponent,StatusComponent,ImportModalitemComponent,ImportModaltacheComponent,ImportModalprojetComponent,ImportModalcontactComponent,ImportModalclientComponent,ImportModalComponent,ImportModaltarifComponent,ImportModalelementComponent,ModalUpdateListeDePrixComponent,ModalDeleteListeDePrixComponent,ModalAddListeDePrixComponent,ListeDePrixComponent,SidebarComponent,AppComponent, Page1Component, TacheComponent, ItemComponent, DevisComponent, ClientComponent, ContactComponent, ProjetComponent, ModaladdtacheComponent, ModalupdatetacheComponent, ModaladditemComponent, ModalupdateitemComponent, ModaladddevisComponent, ModalupdatedevisComponent, ModalupdateclientComponent, ModaladdclientComponent, ModaladdcontactComponent, ModalupdatecontactComponent, ModalupdateprojetComponent,  ItemTacheComponent, ClientContactComponent, ModalupdateitemTacheComponent, ModaladditemTacheComponent, ModalupdateclientContactComponent, ModaladdclientcontactComponent, ModaldeletetacheComponent, ModaldeleteitemComponent, ModaldeletedevisComponent, ModaldeleteclientComponent, ModaldeletecontactComponent, ModaldeleteprojetComponent, ModaldeleteitemTacheComponent, ModaldeleteclientContactComponent, DevisEditionComponent, UniteComponent, ModaladduniteComponent, ModalupdateuniteComponent, ModaldeleteuniteComponent, TypeComponent, ModaladdtypeComponent, ModalupdatetypeComponent, ModaldeletetypeComponent, ElementComponent, ModaldeleteelementComponent, ModalupdateelementComponent, ModaladdelementComponent, TarifComponent, ModaladdtarifComponent, ModalupdatetarifComponent, ModaldeletetarifComponent, DevisfComponent, DevistacheComponent, ModaladddevistacheComponent, ModalupdatedevistacheComponent, ModaldeletedevistacheComponent, ModaldeletedevisfComponent, ModalupdatedevisfComponent, ModaladddevisfComponent, ContactProjetComponent, ModaladdcontactProjetComponent],

  imports: [ BrowserModule,
    MatIconModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),BrowserModule,
     AppRoutingModule,
     HttpClientModule,
     FormsModule,
     MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule,
    FilterByTypePipe,
    NgSelectModule,
    ReactiveFormsModule,
  ],


  providers: [NavigationService,    
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}