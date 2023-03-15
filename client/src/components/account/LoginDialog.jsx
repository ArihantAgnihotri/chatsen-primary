import { useContext } from 'react';

import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
    display: flex; 
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const QRCOde = styled('img')({
    margin: '50px 0 0 50px',
    height: 264,
    width: 264
});

const Title = styled(Typography)`
    font-size: 26px;
    margin-bottom: 25px;
    color: #525252;

    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    font-weight: 300;
`;

const dialogStyle = {
    marginTop: '12%',
    height: '95%',
    width: '60%',
    maxWidth: '100',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden'
}

const LoginDialog = () => {

    const { setAccount,showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount(decoded);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    // const onSignoutSuccess = () => {
    //     alert("You have been logged out successfully");
    //     console.clear();
    //     setShowloginButton(true);
    //     setShowlogoutButton(false);
    // };

    return (
        
        <Dialog
        open={true}
        BackdropProps={{style: {backgroundColor: '#00000030'}}}

        maxWidth={'md'}
        PaperProps={{ sx: dialogStyle }}
    >
        <Component>
            <h1 className='title'> <span className='title-chat'>CHAT</span><span className='title-sen'>SEN</span></h1>
            <Box style={{ position: 'absolute', top : '20%', left : '20%'}} >
                    <h1 className='type-animation'>Connect with friends</h1>           
            </Box>

            <Box style={{ position: 'absolute', top : '50%', left : '32%'}} >
                    <h1 className='type-animation small'>One click Login/Register</h1>           
            </Box>
            
            <Box style={{ position: 'absolute', top : '60%', left : '35%'}}>
                    
                        <GoogleLogin
                            buttonText="Google Login"
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}

                            />
                </Box>
            
        </Component>
    </Dialog>
    )
}

export default LoginDialog;