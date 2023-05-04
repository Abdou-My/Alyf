import ListPromotion from './views/admin/promotion/ListPromo';
import ListOrganisme from './views/admin/organisme/ListOrga';
import ListFormation from './views/admin/formation/ListFormations';
import ListModule from './views/admin/module/ListModule';
import ListStagiaire from './views/admin/stagiaire/ListStagiaires';
import ListAdmin from './views/admin/administrateur/ListAdmins';
import ListFormateur from './views/admin/formateur/ListFormateurs';
import ListGroupe from './views/admin/groupe/ListGroupes';
import CreateStagiaire from './views/admin/stagiaire/CreateStagiaire';
import CreateModule from './views/admin/module/CreateModule';
import CreateGroup from './views/admin/groupe/CreateGroupe';
import CreateAdmin from './views/admin/administrateur/CreateAdmin';
import CreateFormation from './views/admin/formation/CreateFormation';
import CreateFormateur from './views/admin/formateur/CreateFormateur';
import CreateOrganisme from './views/admin/organisme/CreateOrga';
import CreatePromotion from './views/admin/promotion/CreatePromo';
import EditStagiaire from './views/admin/stagiaire/EditStagiaire';
import EditModule from './views/admin/module/EditModule';
import EditFormation from './views/admin/formation/EditFormation';
import EditAdmin from './views/admin/administrateur/EditAdmin';
import EditGroup from './views/admin/groupe/EditGroupe';
import EditFormateur from './views/admin/formateur/EditFormateur';
import EditOrganisme from './views/admin/organisme/EditOrga';
import EditPromo from './views/admin/promotion/EditPromo';
import ViewPromo from './views/admin/promotion/PromoViewBig';

import NavBar from './components/UI/NavBar';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



export default function App() {

  return (
    <div >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ListPromotion />} />
          <Route path='/admin' element={<ListPromotion />} />
          <Route path='/admin/promotion' element={<ListPromotion />} />
          <Route path='admin/formation' element={<ListFormation />} />
          <Route path='admin/stagiaire' element={<ListStagiaire />} />
          <Route path='admin/groupe' element={<ListGroupe />} />
          <Route path='admin/module' element={<ListModule />} />
          <Route path='admin/administrateur' element={<ListAdmin />} />
          <Route path='admin/formateur' element={<ListFormateur />} />
          <Route path='admin/organisme' element={<ListOrganisme />} />
          <Route path='admin/stagiaire/create' element={<CreateStagiaire />} />
          <Route path='admin/module/create' element={<CreateModule />} />
          <Route path='admin/formation/create' element={<CreateFormation />} />
          <Route path='admin/administrateur/create' element={<CreateAdmin />} />
          <Route path='admin/formateur/create' element={<CreateFormateur />} />
          <Route path='admin/organisme/create' element={<CreateOrganisme />} />
          <Route path='admin/promotion/create' element={<CreatePromotion />} />
          <Route path='admin/group/create' element={<CreateGroup />} />
          <Route path='admin/stagiaire/modifier/:id' element={<EditStagiaire />} />
          <Route path='admin/module/modifier/:id' element={<EditModule />} />
          <Route path='admin/formation/modifier/:id' element={<EditFormation />} />
          <Route path='admin/administrateur/modifier/:id' element={<EditAdmin />} />
          <Route path='admin/formateur/modifier/:id' element={<EditFormateur />} />
          <Route path='admin/organisme/modifier/:id' element={<EditOrganisme />} />
          <Route path='admin/promotion/modifier/:idp' element={<EditPromo />} />
          <Route path='admin/groupe/modifier/:idg' element={<EditGroup />} />
          <Route path='admin/promotion/visualiser/:idp' element={<ViewPromo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


