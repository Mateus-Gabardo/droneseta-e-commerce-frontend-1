/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import React from "react";
import StepLabel from '@mui/material/StepLabel';
import {
  Box,
  StepConnector,
  StepIconProps,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faClock, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import DroneStep from "../../images/drone-step.png";

interface StepBarProps {
  step: number;
}

function StepBar({step}: StepBarProps) {
  const steps = [
    'Pagamento confirmado',
    'Aguardando envio',
    'O drone saiu para entrega',
    'Entrega realizada',
  ];

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#6D8B74',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#6D8B74',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: '#6D8B74',
    }),
    ...(ownerState.completed && {
      backgroundColor: '#6D8B74',
    }),
  }));

  // eslint-disable-next-line react/no-unstable-nested-components
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
      2: <FontAwesomeIcon icon={faClock} />,
      3: <img src={DroneStep} alt="Drone carregando entrega" height="24px" />,
      4: <FontAwesomeIcon icon={faBox} />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {

        icons[String(props.icon)]
        }
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Box >
    <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </Box>
  );
}

export default StepBar;
