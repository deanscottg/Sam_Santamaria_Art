import React from "react";
import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from "mjml-react";
import BaseLayout from "./components/BaseLayout";
import Heading from "./components/Heading";
import Header from "./components/Header";
import Text from "./components/Text";
import Footer from "./components/Footer";
import { fontSize, colors, spacing, fontFamily } from "./theme";

const welcomeStyle = `
  .h1 > * {
    font-size: 32px !important;
  }
  .h2 > * {
    font-size: ${fontSize.lg}px !important;
  }
  .p > * {
    font-size: ${fontSize.base}px !important;
  }
`;

type WelcomeProps = {
	name: string;
	email: string;
	message: string;
  artwork?: string;
};

const Welcome = ({ name, email, message, artwork }: WelcomeProps) => {
	return (
		<BaseLayout width={600} style={welcomeStyle}>
			<Header />
			<MjmlWrapper backgroundColor={colors.black}>
				<MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
					<MjmlColumn>
						<Heading cssClass="h1" fontFamily={fontFamily.serif}>
							New Art Inquiry
						</Heading>
					</MjmlColumn>
				</MjmlSection>

				<MjmlSection paddingBottom={spacing.s8} cssClass="gutter">
					<MjmlColumn>
						<Heading cssClass="h2" paddingBottom={spacing.s4}>
							Contact Information
						</Heading>
						<Text
							cssClass="p"
							fontSize={fontSize.md}
							paddingBottom={spacing.s3}
						>
							<strong>Name:</strong> {name}
						</Text>
						<Text
							cssClass="p"
							fontSize={fontSize.md}
							paddingBottom={spacing.s6}
						>
							<strong>Email:</strong> {email}
						</Text>
            {artwork && (
              <Text cssClass="p" fontSize={fontSize.md} paddingBottom={spacing.s6}>
                <strong>Artwork of Interest:</strong> {artwork}
              </Text>
            )}
					</MjmlColumn>
				</MjmlSection>

				<MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
					<MjmlColumn>
						<Heading cssClass="h2" paddingBottom={spacing.s4}>
							Message
						</Heading>
						<Text
							cssClass="p"
							fontSize={fontSize.md}
							paddingBottom={spacing.s7}
						>
							{message}
						</Text>
					</MjmlColumn>
				</MjmlSection>
			</MjmlWrapper>
			<Footer />
		</BaseLayout>
	);
};

export default Welcome;
