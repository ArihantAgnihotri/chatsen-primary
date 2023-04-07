import { useContext, useEffect, useState } from 'react';

import { styled, Box, Typography } from "@mui/material";

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';

import { setConversation, getConversation } from '../../../service/api';
import { emptyProfilePicture } from '../../../constants/data';
import { formatDate } from '../../../utils/common-utils';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;

const Conversation = ({ user }) => {
    const url = user.picture || emptyProfilePicture;
    
    const { setPerson } = useContext(UserContext);
    const { account, newMessageFlag }  = useContext(AccountContext);
    const [message, setMessage] = useState({});
    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    }

    return (
        <Component onClick={() => getUser()} onMouseEnter={(e)=>e.target.style.boxShadow = '1px 2px 9px #b1aaf4' } onMouseLeave={(e)=>e.target.style.boxShadow = '0px 0px 0px #ffff'}>
            <Box>
                <Image src={url} alt="display picture" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{user?.name?.length>=50?user.name.substring(0,40)+'...':user.name}</Typography>
                    { 
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? '📁 media' : message?.text?.length >=50 ? message.text.substring(0,50)+'...' : message.text}</Text>
         
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation;