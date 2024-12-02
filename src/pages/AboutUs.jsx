import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled components using `styled` API, with better design and colors
const Root = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: '60px 20px',
  backgroundColor: '#fafafa',
  textAlign: 'center',
  direction: 'rtl',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  color: '#FF9800', // Use a bright, vibrant orange for titles
  marginBottom: theme.spacing(2),
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.8,
  color: '#555',
  fontFamily: 'IRANSans, sans-serif',
  marginBottom: theme.spacing(3),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: '12px 30px',
  backgroundColor: '#FF9800', // Vibrant orange color
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '30px',
  textTransform: 'uppercase',
  fontFamily: 'IRANSans, sans-serif',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FF5722', // Darker orange on hover
    boxShadow: '0 8px 20px rgba(255, 87, 34, 0.3)', // Add shadow on hover
    transform: 'scale(1.05)', // Slight scaling effect
  },
}));

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Root>
        <Header>
          <Typography variant="h3" sx={{ fontFamily: 'IRANSans', color: '#333', marginBottom: '20px' }}>
            درباره تورسا
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontFamily: 'IRANSans', color: '#777' }}>
            ما مفتخریم که در کنار شما باشیم تا تجربه‌ای بی‌نظیر از سفرها و تورهای داخلی و خارجی را برایتان رقم بزنیم.
          </Typography>
        </Header>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Section>
              <SectionTitle>هدف ما</SectionTitle>
              <SectionContent>
                تورسا با هدف ارائه بهترین تجربه‌های سفر به مشتریان خود در ایران و سراسر جهان، شروع به کار کرده است. تیم ما از کارشناسان خبره در زمینه تورها و سفرها تشکیل شده است و تمام تلاش خود را می‌کنیم تا سفرهایی فراموش‌نشدنی و پر از خاطرات خوب برای شما فراهم کنیم.
              </SectionContent>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section>
              <SectionTitle>ویژگی‌های ما</SectionTitle>
              <SectionContent>
                <ul style={{ textAlign: 'right', marginRight: '20px' }}>
                  <li>تورهای داخلی و خارجی متنوع</li>
                  <li>ارائه بهترین قیمت‌ها و تخفیف‌های ویژه</li>
                  <li>خدمات حرفه‌ای و پشتیبانی 24/7</li>
                  <li>تجربه سفر با کیفیت و راحتی بالا</li>
                </ul>
              </SectionContent>
            </Section>
          </Grid>

          <Grid item xs={12}>
            <Section>
              <SectionTitle>چرا تورسا؟</SectionTitle>
              <SectionContent>
                تورسا با استفاده از به‌روزترین تکنولوژی‌ها و تجربیات در حوزه گردشگری، بهترین خدمات را به شما ارائه می‌دهد. ما متعهد هستیم که با دقت و توجه به جزئیات، بهترین سفر را برای شما برنامه‌ریزی کنیم. تیم ما همیشه در دسترس است تا اطمینان حاصل کنیم که سفر شما بدون هیچ مشکلی به پایان می‌رسد.
              </SectionContent>
            </Section>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <ButtonStyled variant="contained" onClick={() => window.location.href = "/tours"}>
            مشاهده تورها
          </ButtonStyled>
        </Box>
      </Root>
      <Footer />
    </>
  );
};

export default AboutUs;
