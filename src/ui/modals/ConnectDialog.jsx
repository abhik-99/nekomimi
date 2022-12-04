import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  ButtonBase,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

import { WorldIDWidget } from "@worldcoin/id";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import cat_eyes from "../../assets/image/cat_eyes.jpg";

const ChooseRole = ({ active, setActive }) => {
  const theme = useTheme();
  return (
    <>
      <Typography color="white" mt={1}>
        Which Role would you like to be associated in with NekoMimi?
      </Typography>
      <ButtonBase
        onClick={() => setActive(0)}
        sx={{
          width: "100%",
          marginTop: 2,
          padding: 4,
          display: "block",
          border: 2,
          borderColor: theme.palette.primary.light,
          borderRadius: theme.spacing(2),
          backdropFilter: "blur(6px)",
        }}
        title="The Rockstars"
      >
        <Typography>Citizen Journalist</Typography>
        {active === 0 && <CheckCircleIcon />}
      </ButtonBase>

      <ButtonBase
        onClick={() => setActive(1)}
        sx={{
          width: "100%",
          marginTop: 2,
          padding: 4,
          display: "block",
          border: 2,
          borderColor: theme.palette.primary.light,
          borderRadius: theme.spacing(2),
          backdropFilter: "blur(6px)",
        }}
        title="The Media Houses and the Rockstar Enablers"
      >
        <Typography>Outsourcer</Typography>
        {active === 1 && <CheckCircleIcon />}
      </ButtonBase>
    </>
  );
};

const ConnectWallet = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      <Typography mt={1} color="white">
        We support the following wallets:
      </Typography>
      {connectors.map((connector) => (
        <Button
          variant="outlined"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          fullWidth
          sx={{
            marginY: 1,
            backdropFilter: "blur(10px)",
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

const VerifyPersonhood = ({ onClose, setComplete }) => {
  const theme = useTheme();
  const handleSuccess = (result) => {
    console.log(result);
    setComplete();
    onClose();
  };
  const widgetProps = {
    actionId: "wid_ea9201e82e383e97c922ee8487aec25e",
    signal: "user-id-1",
    enableTelemetry: true,
    appName: "nekomimi",
    signalDescription: "Zk-enabled KYC",
    theme: "dark",
    // debug: true, // DO NOT SET TO `true` IN PRODUCTION
    onSuccess: handleSuccess,
    onError: ({ code, detail }) => console.log({ code, detail }),
    onInitSuccess: () => console.log("Init successful"),
    onInitError: (error) =>
      console.log("Error while initialization World ID", error),
  };

  return (
    <>
      <Typography color="white" mt={2} mb={1}>
        Just a final step.
      </Typography>
      <Typography color="white" mt={2} mb={2}>
        Tell us who you are without telling us who you are!
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <WorldIDWidget {...widgetProps} />
      </Box>
      <ButtonBase
        sx={{
          marginTop: 2,
          padding: 2,
          display: "block",
          border: 2,
          borderColor: theme.palette.primary.light,
          borderRadius: theme.spacing(2),
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography>Polygon Connect ID (To be launched with DAO)</Typography>
      </ButtonBase>
    </>
  );
};

const ConnectDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const [step, setStep] = React.useState(0);
  const [activeRole, setActiveRole] = React.useState(0);

  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleClose = () => {
    if (step < 3) disconnect();
    onClose();
    setStep(0);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connect to NekoMimi</DialogTitle>
        <DialogContent
          sx={{
            backgroundImage: `url(${cat_eyes})`,
            backgroundColor: theme.palette.common.black,

            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {isConnected && step === 1 && (
            <Typography color="white">
              You are all set in this step. Please Proceed to the Next step :)
            </Typography>
          )}
          {step === 0 && (
            <ChooseRole
              active={activeRole}
              setActive={(role) => setActiveRole(role)}
            />
          )}
          {!isConnected && step === 1 && <ConnectWallet />}
          {isConnected && step === 2 && (
            <VerifyPersonhood
              onClose={onClose}
              setComplete={() => setStep(3)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="error">
            Cancel
          </Button>
          {step !== 2 && (
            <Button
              variant="contained"
              color="secondary"
              disabled={step === 1 ? !isConnected : false}
              onClick={() => setStep((prev) => Math.min(2, prev + 1))}
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConnectDialog;
