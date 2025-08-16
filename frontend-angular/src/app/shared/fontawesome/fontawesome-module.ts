import { NgModule } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

// ICONS
import {
  faRightToBracket,
  faRightFromBracket,
  faUsers,
  faUserPlus,
  faPlus,
  faBoxOpen,
  faBriefcase,
  faIdCard,
  faEnvelope,
  faCalendar,
  faTrash,
  faGears,
  faBan,
  faTriangleExclamation,
  faTrashCan,
  faKey,   
  faLock, 
  faUnlock,
  faShieldHalved,
  faFingerprint,
  faPencil,
  faBrazilianRealSign,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  exports: [FontAwesomeModule],
})
export class FontawesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faRightToBracket,
      faRightFromBracket,
      faUsers,
      faPlus,
      faUserPlus,
      faBoxOpen,
      faBriefcase,
      faIdCard,
      faEnvelope,
      faCalendar,
      faTrash,
      faGears,
      faBan,
      faTriangleExclamation,
      faTrashCan,
      faKey,
      faLock,
      faUnlock,
      faShieldHalved,
      faFingerprint,
      faPencil,
      faBrazilianRealSign,
      faMoneyBillWave
    );
  }
}