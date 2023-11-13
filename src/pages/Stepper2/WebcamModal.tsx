import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TakeWebcamImage from './TakeWebcamImage'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function NestedModal({ setImageSrc }: any) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const closeWebcamModal = (data: any) => {
        setOpen(false);
        console.log(data);
        setImageSrc(data);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: "100vw", height: "90vh", maxWidth: '700px' }}>
                    <TakeWebcamImage OnCloseWebcamModal={closeWebcamModal} />
                </Box>
            </Modal>
        </div>
    );
}