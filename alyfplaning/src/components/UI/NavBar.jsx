import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";



export default function NavBar() {
    let promo; let module; let stagiaire; let admin; let formateur;let utilisateurs; let formation; let orga; let groupe; let moncompte;
    
    const [page,setPage] = useState('promotion');
	// utilisateurs 
	if(page=='administrateurs'){
		utilisateurs = (<li className="nav-item dropdown active">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Utilisateurs / Administrateurs
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="admin/administrateur" onClick={()=>setPage("administrateurs")}>Administrateur</Link></li>
            <li><hr className="dropdown-divider"/></li>
			<li><Link className="dropdown-item" to="admin/organisme" onClick={()=>setPage("organismes")}>Organisme</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="admin/formateur" onClick={()=>setPage("formateurs")}>Formateur</Link></li>
          </ul>
        </li>)
	}else if(page=='organismes'){
		utilisateurs = (<li className="nav-item dropdown active">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Utilisateurs / Organismes
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="admin/administrateur" onClick={()=>setPage("administrateurs")}>Administrateur</Link></li>
            <li><hr className="dropdown-divider"/></li>
			<li><Link className="dropdown-item" to="admin/organisme" onClick={()=>setPage("organismes")}>Organisme</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="admin/formateur" onClick={()=>setPage("formateurs")}>Formateur</Link></li>
          </ul>
        </li>)
	} else if(page=='formateurs'){
		utilisateurs = (<li className="nav-item dropdown active">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Utilisateurs / Formateurs
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="admin/administrateur" onClick={()=>setPage("administrateurs")}>Administrateur</Link></li>
            <li><hr className="dropdown-divider"/></li>
			<li><Link className="dropdown-item" to="admin/organisme" onClick={()=>setPage("organismes")}>Organisme</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="admin/formateur" onClick={()=>setPage("formateurs")}>Formateur</Link></li>
          </ul>
        </li>)
	}else{
			utilisateurs = (<li className="nav-item dropdown">
			  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Utilisateurs 
			  </a>
			  <ul className="dropdown-menu">
				<li><Link className="dropdown-item" to="admin/administrateur" onClick={()=>setPage("administrateurs")}>Administrateur</Link></li>
				<li><hr className="dropdown-divider"/></li>
				<li><Link className="dropdown-item" to="admin/organisme" onClick={()=>setPage("organismes")}>Organisme</Link></li>
				<li><hr className="dropdown-divider"/></li>
				<li><Link className="dropdown-item" to="admin/formateur" onClick={()=>setPage("formateurs")}>Formateur</Link></li>
			  </ul>
			</li>)
		}
	
	
	
	//mon compte
	if(page=="monProfile"){
		moncompte = (<ul className="navbar-nav mr-auto order-lg-last">
		  <li className="nav-item dropdown active">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mon compte / Profile
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="admin/monProfile" onClick={()=>setPage("monProfile")}>Mon profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Deconnexion</a></li>
          </ul>
        </li>
		  </ul>)
	}else{
		moncompte = (<ul className="navbar-nav mr-auto order-lg-last">
		  <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mon compte
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="admin/monProfile" onClick={()=>setPage("monProfile")}>Mon profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Deconnexion</a></li>
          </ul>
        </li>
		  </ul>)
	}
    // promo active
    if (page=='promotion'){
        promo = <li className="nav-item active"><Link className="nav-link" aria-current="page" to="admin/promotion" onClick={()=>setPage("promotion")}>Promotion</Link></li>
    }else{
        promo = <li className="nav-item"><Link className="nav-link" aria-current="page" to="admin/promotion" onClick={()=>setPage("promotion")}>Promotion</Link>    </li>
    }
    //orga active to delete
    if (page=='organisme'){
        orga = <li className="nav-item active"><Link className="nav-link active" aria-current="page" to="admin/organisme" onClick={()=>setPage("organisme")}>Organisme</Link></li>
    }else{
        orga = <li className="nav-item "><Link className="nav-link" aria-current="page" to="admin/organisme" onClick={()=>setPage("organisme")}>Organisme</Link>    </li>
    }
    //module active
    if (page=='module'){
         module = <li className="nav-item active"><Link className="nav-link active" aria-current="page" to="admin/module" onClick={()=>setPage("module")}>Module</Link></li>
    }else{
         module = <li className="nav-item "><Link className="nav-link" aria-current="page"  to="admin/module" onClick={()=>setPage("module")}>Module</Link>    </li>
    }
	//formation active
    if (page=='formation'){
		formation = <li className="nav-item active"><Link className="nav-link" aria-current="page" to="admin/formation" onClick={()=>setPage("formation")}>Formation</Link></li>
   }else{
	formation = <li className="nav-item "><Link className="nav-link" aria-current="page" to="admin/formation" onClick={()=>setPage("formation")}>Formation</Link>    </li>
   }
   //groupe active
   if (page=='groupe'){
	groupe = <li className="nav-item active"><Link className="nav-link " aria-current="page" to="admin/groupe" onClick={()=>setPage("groupe")}>Groupe</Link></li>
}else{
	groupe = <li className="nav-item "><Link className="nav-link" aria-current="page" to="admin/groupe" onClick={()=>setPage("groupe")}>Groupe</Link>    </li>
}
//stagiaire active
if (page=='stagiaire'){
	stagiaire = <li className="nav-item active"><Link className="nav-link" aria-current="page" to="admin/stagiaire" onClick={()=>setPage("stagiaire")}>Stagiaire</Link></li>
}else{
	stagiaire = <li className="nav-item "><Link className="nav-link" aria-current="page"  to="admin/stagiaire" onClick={()=>setPage("stagiaire")}>Stagiaire</Link>    </li>
}
    return(
    
		
		<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar  ftco-navbar-light" id="ftco-navbar">
	    <img src="https://www.alyfpro.fr/wp-content/uploads/2022/04/unnamed-1-1-320x171.png" alt="Alyf" width="100" height="60" style={{marginLeft:"50px"}}/>
		<div className="container">
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="fa fa-bars"></span> Menu
	      </button>
		 {moncompte}
	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav mr-auto">
	        	{promo}
				{formation}
				{module}
				{stagiaire}
	        	{groupe}
				{utilisateurs}
	        </ul>
	      </div>
	    </div>
	  </nav>
   


   )
}