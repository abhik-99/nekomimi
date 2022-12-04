import { Typography, Box, Button, Grid, Fade, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ConnectDialog from "./ui/modals/ConnectDialog";
import React from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Link, animateScroll as scroll, Element } from "react-scroll";

import mimi from "./assets/image/logo.png";
import signup from "./assets/image/cats_entering.png";
import curious_kitty from "./assets/image/cat_curious.png";
import cat_camera from "./assets/image/cat_camera.png";
import cat_business from "./assets/image/cat_business.png";

function App() {
  const theme = useTheme();
  const [showConnectDialog, setShowConnectDialog] = React.useState(false);
  const { disconnect } = useDisconnect();

  const { address, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  return (
    <Box
      sx={{
        background: theme.palette.background.default,
      }}
    >
      <Box sx={{ width: "100%", pt: 10 }}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8} lg={9} align="center">
            <Fade in={true} timeout={1500}>
              <img src={mimi} alt="Nekomimi" sx={{ objectFit: "contain" }} />
            </Fade>
          </Grid>
          <Grid item xs={12} md={3} lg={2}>
            <Slide in={true} timeout={800} direction="left">
              <Button
                variant="contained"
                onClick={() => setShowConnectDialog(true)}
                fullWidth
              >
                Begin the Good Work
              </Button>
            </Slide>
            {isConnected && (
              <Button
                variant="outlined"
                onClick={disconnect}
                sx={{ textTransform: "none", marginY: 1 }}
              >
                {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
                <Typography>
                  {ensName
                    ? `${ensName} (0x...${address.slice(
                        address.length - 5,
                        address.length
                      )})`
                    : `0x..${address
                        .slice(address.length - 5, address.length)
                        .toLocaleLowerCase()}`}
                </Typography>
              </Button>
            )}
            <Slide in={true} timeout={1000} direction="left">
              
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginY: 1 }}
              >
                <Link to="how-it-works">How it Works?</Link>
                
              </Button>
            </Slide>
            <Slide in={true} timeout={1200} direction="left">
              <Button variant="contained" color="info" fullWidth>
                <Link to="roadmap">Our Roadmap</Link>
              </Button>
            </Slide>
            <Slide in={true} timeout={1500} direction="left" sx={{ marginY: 1 }}>
              <Button variant="contained" color="warning" fullWidth>
                <Link to="contact">Get in Touch</Link>
              </Button>
            </Slide>
          </Grid>
        </Grid>
      </Box>
      <Fade in={true} timeout={1500}>
        <Box sx={{ textAlign: "center", marginTop: 5 }} className="about">
          <Typography variant="h1" color="white">
            About
          </Typography>
          <Typography color="grey" mx={4}>
            Nekomimi is a Web3 project designed to stop the spread of
            misinformation by identifying the sources without revealing their
            identities. While the project aims to be censor resistant, it also
            recognizes that some sources need to be flagged as incorrect. To
            that end, it incorporates a DAO-based structure to decide on a
            Sanctions list.{" "}
          </Typography>
          <Typography color="grey" my={2}>
            <b>
              The project is built for the people, its of the people and with
              the 2023 Q3 launch - by the poeple. It is meant to be a self-sustaining ecosystem which finds balance between order and chaos.
            </b>
          </Typography>
          <Typography color="grey" mx={5} mt={1}>
            Nekomimi outsources KYC to Worldcoin and Polygon Connect ID (to be
            launched with the DAO) to ensure that the platform is
            sybil-resistant and at the same time protects the privacy of its
            users.
          </Typography>
        </Box>
      </Fade>

      <Box sx={{ marginTop: 8, padding: 2 }} className="how-to-works">
        <Typography variant="h1" color="wheat" align="center" mb={4} id="how-it-works">
          How does it work?
        </Typography>

        <Box sx={{ display: "flex", paddingLeft: 2, paddingBottom: 2 }}>
          <img src={cat_camera} height={60} alt="camera" />
          <Typography variant="h2" color="wheat">
            As a Citizen Journalist:
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={3} lg={2} align="left">
              <img src={signup} alt="sign up" width={"100%"} />
            </Grid>
            <Grid item xs={12} md={1} align="center">
              <Typography variant="h2" color="wheat">
                1.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={7} align="right">
              <Typography color="grey" align="left">
                You Sign up on the platform with a wallet address and then do a
                basic <b>Proof of Personhood</b> check to verify that you a real
                person and then you sign up you camera device on the platform as
                contract
              </Typography>
              <Typography color="grey" align="left" mt={1}>
                <b>Note:</b> We record no data which might lead back to you.
                It's all Zero Knowledge Based KYC. We recommend you use
                Worldcoin before we launch the DAO.
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: 3 }}
          >
            <Grid item xs={12} md={1} align="center">
              <Typography variant="h2" color="wheat">
                2.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={7} align="left">
              <Typography color="grey" align="left">
                You find something that needs to be reported. You snip a picture
                (we will be expanding to audio and video NFTs by Q1 2023). You
                post it as an NFT and it shows up on our marketplace with the 5
                tags you set.
              </Typography>
              <Typography color="grey" align="left">
                You decide if you want this NFT to be rentable (basically allow
                news channels to use it but give you credit) or transferable
                (sell it once and for all to news media house). And that's it!
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={2} align="right">
              <img src={curious_kitty} alt="sign up" width={"100%"} />
            </Grid>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            paddingLeft: 2,
            paddingBottom: 2,
            marginTop: 3,
          }}
        >
          <img src={cat_business} height={60} alt="camera" />
          <Typography variant="h2" color="wheat">
            As an Outsourcer:
          </Typography>
        </Box>
        <Typography color="grey" mx={4}>
          As an outsourcer, you get to buy or rent the images (and soon enough,
          videos and audios) that are put out by the citizen journalists. You
          can try to pay them via out platform (anonymously even) and then you
          get to do basically whatever you want with those.
        </Typography>
        <Typography color="grey" mx={4}>
          You can be assured that what you get is coming from a real human being
          and not a deepfake or bot.
        </Typography>
      </Box>

      <Box sx={{ paddingY: 4 }}>
        <Element name="roadmap">
        <Typography variant="h1" mt={4} color="white" align="center" id="roadmap">
          Roadmap
        </Typography>

        </Element>
        <Typography variant="h2" my={2} color="white" align="center">
          Q1 2023 - Beta Release
        </Typography>
        <Typography color="grey" align="center">
          This is where we first test out our platform by offering a select
          group of users the experience and then introspecting on that.
        </Typography>
        <Typography color="grey" align="center">
          We will be providing our services on Polygon. But we will actively
          seeking out chains which are suitable to our usecase at this point.
        </Typography>
        <Typography variant="h2" my={2} color="white" align="center">
          Q2 2023 - DAO Launch
        </Typography>
        <Typography color="grey" align="center">
          {" "}
          The DAO launch and the Governance token launch will enable us to
          onboard the early batch of investors, beta users and generate funds.
          These funds will be used to audit the platform from third parties and
          make sure we are ready for our main launch. This is also where the
          Polygon Connect ID will be integrated.
        </Typography>
        <Typography variant="h2" my={2} color="white" align="center">
          Q3 2023 - Main Launch
        </Typography>
        <Typography color="grey" align="center">
          Nekomimi becomes generally available to all!
        </Typography>
      </Box>

      <Box sx={{ padding: 4 }}>
        <Element name="contact">

        <Typography variant="h3" color="wheat" id="contact">
          Get in Touch
        </Typography>
        </Element>
        <Typography color="grey">
          Hey There! So my name is Abhik Banerjee. I built this project as a
          hobby. If you want to get in touch with me, feel free to ping me on
          Twitter at @abhikbanerjee0 . Cheers!
        </Typography>
      </Box>

      <ConnectDialog
        open={showConnectDialog}
        onClose={() => setShowConnectDialog(false)}
      />
    </Box>
  );
}

export default App;
