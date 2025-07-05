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
  Divider,
  CircularProgress,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import { Person, Email, Message, Send, Share } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

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
        "https://formsubmit.co/ekizulfarrachman@gmail.com",
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
    <Box sx={{ minHeight: "100vh", py: 4 }}>
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
          {/* Contact Form */}
          <Grid item xs={12} lg={6}>
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
                  action="https://formsubmit.co/ekizulfarrachman@gmail.com"
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

                <Box mt={4} pt={3}>
                  <Divider
                    sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }}
                  />
                  <Box display="flex" justifyContent="center">
                    <SocialLinks />
                  </Box>
                </Box>
              </StyledPaper>
            </Grow>
          </Grid>

          {/* Comments Section */}
          <Grid item xs={12} lg={6}>
            <Grow in timeout={1400}>
              <StyledPaper elevation={0} sx={{ height: "fit-content" }}>
                <Komentar />
              </StyledPaper>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
