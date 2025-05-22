import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationTemplateProps {
  email: string;
  emailVerificationToken: string;
}

export const VerificationTemplate = ({
  email,
  emailVerificationToken,
}: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Silakan verifikasi alamat email Anda untuk menyelesaikan pendaftaran.
      </Preview>
      <Container style={container}>
        <Text style={paragraph}>Halo {email},</Text>
        <Text style={paragraph}>
          Terima kasih telah mendaftar. Silakan verifikasi alamat email Anda
          untuk mengaktifkan akun Anda.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={emailVerificationToken}>
            Verifikasi Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Jika Anda tidak membuat akun, abaikan email ini.
        </Text>
        <Text style={paragraph}>
          Salam,
          <br />
          Tim Dukungan
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Jika Anda mengalami masalah dengan tombol di atas, salin dan tempel
          URL di bawah ini ke browser web Anda:
        </Text>
        <Text style={footer}>{emailVerificationToken}</Text>
      </Container>
    </Body>
  </Html>
);

VerificationTemplate.PreviewProps = {
  email: "user@example.com",
  emailVerificationToken: "https://example.com/verify/token123",
} as VerificationTemplateProps;

export default VerificationTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#999999",
  fontSize: "12px",
};
