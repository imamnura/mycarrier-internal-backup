import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Box, Dialog } from "@material-ui/core";
import Button from "@components/Button";
import Typography from "@components/Typography";
import useStyles from "./styles";
import PopupAlertContext from '@context/PopupAlert';

const DownloadAuthorization = ({ defaultOpen, onClose }) => {
  const [open, setOpen] = useState(defaultOpen);
  const { setData } = useContext(PopupAlertContext);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setData({
      message: '',
      variant: 'success',
    });
    onClose?.();
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <>
        <Box>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            Data Access Requires Authorization
          </Typography>
           <img alt="request data image" src={"/img/img-request-data.png"} style={{ margin: "12px auto", height: "150px"}}/>
          <Box mt={1}>
            <Typography variant="body">
              Access to documents containing personal or confidential
              information is restricted to comply with Indonesia’s Personal Data
              Protection Law (UU PDP).
            </Typography>
            <Box
              mt={1}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body"
                weight="bold"
                as="p"
              >
                1. Prepare an NDE
              </Typography>
              <Typography
                variant="body"
                as="p"
                style={{
                  marginLeft: "14px",
                }}
              >
                Describe the purpose of your data use in Seat Management
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body"
                weight="bold"
                as="p"
              >
                2. Submit for validation
              </Typography>
              <Typography
                variant="body"
                as="p"
                style={{
                  marginLeft: "14px",
                }}
              >
                Email the NDE to the Data Protection Officer (DPO) for
                review.<i>PIC: Retnoningsih (AVP Customer Relationship Management
                WINS)</i>
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body"
                weight="bold"
                as="p"
              >
                3. Forward for approval
              </Typography>
              <Typography
                variant="body"
                as="p"
                style={{
                  marginLeft: "14px",
                }}
              >
                Once validated, send the NDE to the Data Owner (EBG – EBIS & SCM – WINS).<i>PIC: Retnoningsih (AVP Customer Relationship Management WINS)</i>
              </Typography>
            </Box>


            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body"
                weight="bold"
                as="p"
              >
                4. Send to Data Processor (DIT)
              </Typography>
              <Typography
                variant="body"
                as="p"
                style={{
                  marginLeft: "14px",
                }}
              >
                After approval, email the NDE to DIT for data preparation and encryption.<i>PIC: Mujib Nasikha (Data Processor, DIT - mujib.nasihkha@telkom.co.id), and CC: Rona Fajar Imansyah (r.fajar@telkom.co.id), Syahrul Rasyid (syahrul.rasyid@telkom.co.id), and Sang Made Naufal (naufal.mahardhika@telkom.co.id)</i>
              </Typography>
            </Box>


            <Box
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body"
                weight="bold"
                as="p"
              >
                4. Data delivery
              </Typography>
              <Typography
                variant="body"
                as="p"
                style={{
                  marginLeft: "14px",
                }}
              >
                The processed data will be securely shared via Microsoft Teams to the requestor listed in the NDE.
              </Typography>
            </Box>

          </Box>
        </Box>

        <Typography style={{marginTop: "8px"}}>
          Direct downloads are disabled to maintain data privacy and ensure compliance.
        </Typography>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button onClick={handleClose} variant="ghost">
            CLOSE
          </Button>
        </Box>
      </>
    </Dialog>
  );
};

DownloadAuthorization.propTypes = {
  defaultOpen: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

DownloadAuthorization.defaultProps = {
  defaultOpen: false,
  message: "Forbidden download",
};

export default DownloadAuthorization;
