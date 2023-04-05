import { useContext } from 'react';

import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';

import { downloadMedia, formatDate } from '../../../utils/common-utils';
import { iconPDF } from '../../../constants/data';

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
    box-shadow: 5px 5px  rgba(30,30,30,0.5);
`;
    
const Own = styled(Box)`
    background: #c3daf7;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
    box-shadow: 5px 5px  rgba(0,77,128,0.5);
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({ message }) => {
    const { account } = useContext(AccountContext);

    return (
        <>
        {
            account.sub === message.senderId ? 
                <Own>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
            : 
                <Wrapper>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>
        }
        
        </>
    )
}

const TextMessage = ({ message }) => {
    
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

const ImageMessage = ({ message }) => {

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : 
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onMouseEnter={(e)=>e.target.style.cursor = 'pointer' }
                    onMouseLeave={(e)=>e.target.style.cursor = 'default'}
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, color : 'black', border: '1px solid black', borderRadius: '50%' }} 
                />
                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}


export default Message;