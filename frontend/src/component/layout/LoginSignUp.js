import React, { Fragment , useRef, useState , useEffect } from 'react'
import "./LoginSignUp.css"  
import Loader from "../Loader/Loader.js"  
import { Link } from 'react-router-dom'   
import logo from '../../images/logo.png'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"  
import FaceIcon from  "@material-ui/icons/Face"  ;     
import {useDispatch , useSelector } from "react-redux" ; 
import {login , clearErrors , register } from "../../actions/userActions" ;  
import {useAlert } from "react-alert" ;  
import { useNavigate } from 'react-router';

const LoginSignUp = ( {props} ) => {      
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert  = useAlert() ;  
    const {error , loading , isAuthenticated} = useSelector(state=>state.user)
    const loginTab  = useRef(null) ;  
    const registerTab = useRef(null) ; 
    const switcherTab = useRef(null) ;     
    const [user , setUser] = useState({name : "" , email :"" , password: "" ,}) ;  
    const {name, email , password} =  user ; 

    const [avatar , setAvatar] = useState() ;
    const [avatarPreview ,setAvatarPreview ] = useState("/profile.png") ; 
    

    const [loginEmail , setLoginEmail]= useState("") ; 
    const [loginPassword , setLoginPassword] = useState("");

    const loginSubmit = (e)=>{   
           e.preventDefault() ;  
           dispatch(login(loginEmail , loginPassword), )
    }  
    


    const [selectedOption, setSelectedOption] = useState('');

        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
        };


    const registerSubmit  =(e) => { 
          e.preventDefault() ;  
 
          const myForm  = new FormData() ;   

          myForm.set("name" , name) ;  
          myForm.set("email" , email) ; 
          myForm.set("password" , password) ; 
          myForm.set("avatar" , avatar) ;   
          dispatch(register(myForm)) ;
    }    
    const registerDataChange = (e) =>{ 
        if(e.target.name ==="avatar"){ 
             const reader=  new FileReader();   
             reader.onload = ()=>{ 
                 if(reader.readyState === 2){ 
                     setAvatarPreview(reader.result);  
                     setAvatar(reader.result) ;  
                 }
             } ;   
             reader.readAsDataURL(e.target.files[0]);
        } 
        else{ 
             setUser({...user , [e.target.name]:e.target.value })
        }  
    } 

    useEffect(() =>{ 
          if(error){ 
            alert.error(error) ; 
            dispatch(clearErrors()) ; 
        } ;  
        if(isAuthenticated){   
         
            history("/account") ;
           
        }
    } , [dispatch , error  , alert , isAuthenticated])

    const switchTabs =(e , tab)=>{ 
           if(tab === "login"){ 
             switcherTab.current.classList.add("shiftToNeutral") ;
             switcherTab.current.classList.remove("shiftToRight") ; 
             registerTab.current.classList.remove("shiftToNeutralForm") ;  
             loginTab.current.classList.remove("shiftToLeft"); 
           }   
           if(tab === "register"){ 
            switcherTab.current.classList.add("shiftToRight") ; 
            switcherTab.current.classList.remove("shiftToNeutral") ;
            registerTab.current.classList.add("shiftToNeutralForm") ; 
            loginTab.current.classList.add("shiftToLeft");
           }

    }  
    
  return (
     <Fragment >    
        <div className="loginwindow">
        <div 
        className='div-1' > 
           <div className='img-1'> 
              <img src= {logo} alt="error while loading" />
           </div>
              
        </div>
        <div className='div-2'>   
        <div className="LoginSignUpContainer"> 
         <div className="loginSignUpBox"> 
            <div> 
                <div className="login_signUp_toggle"> 
                <p onClick = {(e)=>switchTabs(e , "login")}> LOGIN  </p> 
                <p onClick ={(e) => switchTabs(e , "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}> 
                </button>
            </div>
                <form ref  = {loginTab} className="loginForm" onSubmit = {loginSubmit}> 
                <div className = "loginEmail"> 
                    <MailOutlineIcon/> 
                    <input type="email" placeholder='EMAIL' required value= {loginEmail}  
                    onChange = {(e) => setLoginEmail(e.target.value) }
                    />
                </div>  
                <div className="loginPassword">  
                    <LockOpenIcon /> 
                    <input type="password" placeholder = "PASSWORD" 
                    required 
                    value = {loginPassword}
                    onChange = {(e) =>  setLoginPassword(e.target.value) 
                    } />
                </div> 

                <div className="UserChoice">
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="">Select an option</option>
                        <option value="option3">NTRO</option>
                        <option value="option1">Organisation</option>
                        <option value="option2">Individual User</option>
                    </select>
                </div>

                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="login" className = "loginBtn" />
                
                
                </form>  
                <form 
                className='signUpForm'
                    ref = {registerTab}   
                    encType = "multipart/form-data"
                    onSubmit = {registerSubmit} 
                >  
                <div className="signUpName">
                <FaceIcon/>  
                <input type="text" placeholder='Name' 
                required  
                name = "name" 
                value = {name} 
                onChange = {registerDataChange}
                />
                </div>  
                <div className="signUpEmail"> 
                <MailOutlineIcon />
                <input type="email" 
                placeholder = "Email"
                required 
                name  ="email"
                value = {email}
                onChange = {registerDataChange}

                />   
                </div>
                <div className="signUpPassword">
                    <LockOpenIcon /> 
                    <input type="password"
                    placeholder = "password" 
                    required
                    name= "password"
                    value = {password}
                    onChange = {registerDataChange} 
                    />
                </div>
                <div className="UserChoice">
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="">Select an option</option>
                        <option value="option3">NTRO</option>
                        <option value="option1">Organisation</option>
                        <option value="option2">Individual User</option>
                        
                    </select>
                </div>
                 {/* <div id="registerImage">  
                 <img src={avatarPreview} alt="Avatar Preview" />   
                 <input type="file" 
                 name = "avatar"
                 accept ="image/"
                 onChange = {registerDataChange}
                  />
                 </div>   */}
                 <input type="submit"
                 value ="Register"
                 className= "signUpBtn"  
                 
                 />
                </form>
         </div>
        </div> 
      </div>
      </div>
     </Fragment>
  )
} 

export default LoginSignUp;
