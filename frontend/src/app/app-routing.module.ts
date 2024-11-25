// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Page1Component } from './page1/page1.component';
import { TacheComponent } from './tache/tache.component';
import { ItemComponent } from './item/item.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { DevisComponent } from './devis/devis.component';
import { ProjetComponent } from './projets/projet.component';
import { ItemTacheComponent } from './item-tache/item-tache.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListeDePrixComponent } from './Liste-prix/ListeDePrix.component';
import { DevisEditionComponent } from './devis-edition/devis-edition.component';
import { UniteComponent } from './unite/unite.component';
import { TypeComponent } from './type/type.component';
import { ElementComponent } from './element/element.component';
import { TarifComponent } from './tarif/tarif.component';
import { DevisfComponent } from './devisf/devisf.component';
import { DevistacheComponent } from './devistache/devistache.component';
import { ContactProjetComponent } from './contact-projet/contact-projet.component';

import { BctComponent } from './bct/bct.component';
import { TacherefComponent } from './tacheref/tacheref.component';
import { UsermanegementComponent } from './usermanegement/usermanegement.component';
import { StatusComponent } from './status/status.component';
import { PrioriteComponent } from './priorite/priorite.component';
import { SituationComponent } from './situation/situation.component';
import { ProfessionComponent } from './profession/profession.component';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SendVerificationComponent } from './signup/send-verification/send-verification.component';
import { SetPasswordComponent } from './signup/set-password/set-password.component';
import { VerifyCodeComponent } from './signup/verify-code/verify-code.component';
import { AccueilComponent } from './signup/accueil/accueil.component';
import { AuthGuard } from './guards/auth.guard';
import { SuperAdminGuard } from './guards/superadmin.guard';
import { AdminGuard } from './guards/admin.guard';
import { VerifyCodeGuard } from './guards/verifyCode.guard';
import { SetPasswordGuard } from './guards/setpassword.guard';
const routes: Routes = [
  { path: 'tacheref', component: TacherefComponent ,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'usermanegement', component: UsermanegementComponent,canActivate:  [AuthGuard] },

  { path: 'page1', component: Page1Component ,canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent ,canActivate: [AuthGuard] },
  { path: 'tache/:projectId', component: TacheComponent ,canActivate: [AuthGuard] },
  { path: 'contact-client/:projectId', component: ClientContactComponent ,canActivate: [AuthGuard] },
  { path: 'contact-projet/:projectId', component: ContactProjetComponent ,canActivate: [AuthGuard] },
  { path: 'contact-projet', component: ContactProjetComponent ,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent ,canActivate: [AuthGuard]  },
  { path: 'send-verification', component: SendVerificationComponent  },
  { path: 'verify-code', component: VerifyCodeComponent, canActivate: [VerifyCodeGuard] },
  { path: 'set-password', component: SetPasswordComponent, canActivate: [SetPasswordGuard] },
  // { path: '', redirectTo: '/accueil', pathMatch: 'full' ,canActivate: [AuthGuard] },
  { path: 'accueil', component: AccueilComponent  },

  { path: 'Item/:taskId', component: ItemComponent ,canActivate: [AuthGuard] }, // Ajoutez cette route pour prendre en charge l'ID de la tâche
  { path: 'client', component: ClientComponent ,canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent ,canActivate: [AuthGuard] },
  { path: 'devis', component: DevisComponent,canActivate: [AuthGuard]  },
  { path: 'projets', component: ProjetComponent ,canActivate: [AuthGuard] },
  { path: 'bcts', component: BctComponent ,canActivate: [AdminGuard] },

  { path: 'projets/contact/:contactId', component: ProjetComponent ,canActivate: [AuthGuard] },
  { path: 'projets/client/:clientId', component: ProjetComponent ,canActivate: [AuthGuard] },

  { path: 'projets/:contactId/:clientId', component: ProjetComponent ,canActivate: [AuthGuard] },
  // { path: 'projets/:clientId', component: ProjetComponent },

  // { path: 'projets/:contactId', component: ProjetComponent },

  { path: 'item-tache', component: ItemTacheComponent ,canActivate: [AuthGuard] },
  { path: 'client-contact/:id', component: ClientContactComponent ,canActivate: [AuthGuard] },
  { path: 'Listprix', component: ListeDePrixComponent ,canActivate: [AuthGuard] },
  { path: 'devis-edition/:devisId', component: DevisEditionComponent ,canActivate: [AuthGuard] },
  { path: 'unite', component: UniteComponent ,canActivate:[AdminGuard]},
  { path: 'devisf/:projectId', component: DevisfComponent ,canActivate: [AuthGuard] },
  { path: 'devistache/:projectId/:devisId', component: DevistacheComponent ,canActivate: [AuthGuard] },
  { path: 'tarif/:id', component: TarifComponent ,canActivate: [AdminGuard]},
  { path: 'type', component: TypeComponent ,canActivate: [AdminGuard]},  
  { path: 'status', component: StatusComponent,canActivate: [AdminGuard]},  
  { path: 'priorite', component: PrioriteComponent,canActivate: [AdminGuard]},  
  { path: 'situation', component: SituationComponent,canActivate: [AdminGuard]},  
  { path: 'profession', component: ProfessionComponent,canActivate: [AdminGuard]},  
  { path: 'element', component: ElementComponent ,canActivate: [AuthGuard] },
  // { path: 'devis-edition/:devisId/:projectId', component: DevisEditionComponent ,canActivate: [AuthGuard] },

  // { path: '', redirectTo: '/page1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}