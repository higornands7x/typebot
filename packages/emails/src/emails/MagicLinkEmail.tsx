import React, { ComponentProps } from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlSpacer,
} from '@faire/mjml-react'
import { render } from '@faire/mjml-react/utils/render'
import { HeroImage, Text, Button, Head } from '../components'
import { SendMailOptions } from 'nodemailer'
import { sendEmail } from '../sendEmail'
import { env } from '@typebot.io/env'

type Props = {
  url: string
}

export const MagicLinkEmail = ({ url }: Props) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <MjmlSection padding="0">
        <MjmlColumn>
          <HeroImage
            src={`${env.NEXTAUTH_URL}/images/yourMagicLinkBanner.png`}
          />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px" cssClass="smooth">
        <MjmlColumn>
          <Text>Esperamos que você esteja bem! Para facilitar ainda mais o seu acesso ao Flowbots, criamos um Link Mágico especialmente para você.

            Clique no botão abaixo e entre diretamente no sistema, sem a necessidade de senha: 👇</Text>
          <MjmlSpacer />
          <Button link={url} align="center">
            Acessar o Flowbots
          </Button>
          <Text>
            Esse link é seguro e válido por [validade do link]. Caso precise de ajuda ou tenha qualquer dúvida, nossa equipe está à disposição!
          </Text>
          <Text>
            Obrigado por fazer parte do Flowbots.
            <br />- Equipe Flowbots
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
)

export const sendMagicLinkEmail = ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof MagicLinkEmail>) =>
  sendEmail({
    to,
    subject: 'Acesso Rápido ao Flowbots: Seu Link Mágico!',
    html: render(<MagicLinkEmail {...props} />).html,
  })
