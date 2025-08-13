import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import {
  Person,
  Email,
  Message,
  Send,
  Share,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

// Toggle comments visibility
const SHOW_COMMENTS = false;

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: theme.spacing(4),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.1)",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(99, 102, 241, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputBase-input": {
    color: "white",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #6366f1 30%, #a855f7 90%)",
  borderRadius: "12px",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.2)",
  },
  "&:active": {
    transform: "scale(0.98)",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    "&:hover": {
      transform: "none",
    },
  },
}));

const GradientTypography = styled(Typography)(() => ({
  background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 700,
}));

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Create FormData from form
      const form = e.target;
      const formDataObj = new FormData(form);

      // Submit to FormSubmit
      const response = await fetch(
        "https://formsubmit.co/rumeshk066@gmail.com",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (response.ok) {
        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box id="Contact" sx={{ minHeight: "100vh", py: 4, position: "relative" }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Fade in timeout={1000}>
            <GradientTypography variant="h2" component="h1" gutterBottom>
              Contact Me
            </GradientTypography>
          </Fade>
          <Fade in timeout={1100}>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(148, 163, 184, 1)",
                maxWidth: "600px",
                mx: "auto",
                mt: 1,
              }}
            >
              Got a question? Send me a message, and I&apos;ll get back to you
              soon.
            </Typography>
          </Fade>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Left info panel */}
          <Grid item xs={12} lg={5}>
            <Grow in timeout={1100}>
              <StyledPaper elevation={0}>
                <Box mb={3}>
                  <GradientTypography variant="h4" component="h2" gutterBottom>
                    Let&apos;s connect
                  </GradientTypography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(156, 163, 175, 1)" }}
                  >
                    I’m open to freelance work, collaborations, and full‑time
                    roles. Drop a message or reach me directly.
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2.5}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Email sx={{ color: "#6366f1" }} />
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgba(148,163,184,1)" }}
                      >
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        rumeshk066@gmail.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <LocationOn sx={{ color: "#a855f7" }} />
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgba(148,163,184,1)" }}
                      >
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Sri Lanka
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <AccessTime sx={{ color: "#22d3ee" }} />
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgba(148,163,184,1)" }}
                      >
                        Response time
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        Typically within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      style={{ width: 24, height: 24, color: "#25D366" }}
                    />
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgba(148,163,184,1)" }}
                      >
                        WhatsApp
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "white" }}
                        // component="a"
                        href="https://wa.me/94767239377"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        076 723 9377
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box mt={4}>
                  <SocialLinks />
                </Box>
              </StyledPaper>
            </Grow>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} lg={7}>
            <Grow in timeout={1200}>
              <StyledPaper elevation={0}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={4}
                >
                  <Box>
                    <GradientTypography
                      variant="h4"
                      component="h2"
                      gutterBottom
                    >
                      Get in Touch
                    </GradientTypography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(156, 163, 175, 1)" }}
                    >
                      Have something to discuss? Send me a message and
                      let&apos;s talk.
                    </Typography>
                  </Box>
                  <Share
                    sx={{ color: "#6366f1", opacity: 0.5, fontSize: 40 }}
                  />
                </Box>

                <Box
                  component="form"
                  action="https://formsubmit.co/rumeshk066@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {/* Hidden FormSubmit Configuration */}
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <Slide direction="up" in timeout={1000}>
                    <StyledTextField
                      fullWidth
                      name="name"
                      label="Your Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: "rgba(156, 163, 175, 1)" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Slide>

                  <Slide direction="up" in timeout={1200}>
                    <StyledTextField
                      fullWidth
                      name="email"
                      label="Your Email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: "rgba(156, 163, 175, 1)" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Slide>

                  <Slide direction="up" in timeout={1400}>
                    <StyledTextField
                      fullWidth
                      name="message"
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                          >
                            <Message sx={{ color: "rgba(156, 163, 175, 1)" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Slide>

                  <Slide direction="up" in timeout={1600}>
                    <GradientButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{ py: 2 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </GradientButton>
                  </Slide>
                </Box>
              </StyledPaper>
            </Grow>
          </Grid>

          {/* Comments Section */}
          {SHOW_COMMENTS && (
            <Grid item xs={12} lg={6}>
              <Grow in timeout={1400}>
                <StyledPaper elevation={0} sx={{ height: "fit-content" }}>
                  <Komentar />
                </StyledPaper>
              </Grow>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
