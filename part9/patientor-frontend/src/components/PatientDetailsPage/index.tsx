import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { apiBaseUrl } from "../../constants";
import { Patient } from "../../types";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";

import { Female, Male } from '@mui/icons-material';

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract patient ID from URL
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    void fetchPatientDetails();
  }, [id]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <Container>
      <Box display='flex'>
        <Typography variant="h4" mr={3}>{patient.name}</Typography>
        {
            patient.gender === 'male' ? <Male/>
            : <Female/>
        }
      </Box>
     
      <List>
        <ListItem>
          <ListItemText primary="SSN" secondary={patient.ssn} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Occupation"
            secondary={patient.occupation}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Date of Birth"
            secondary={patient.dateOfBirth}
          />
        </ListItem>

      </List>

      <Typography variant="h5">Entries:</Typography>

    </Container>
  );
};

export default PatientDetailsPage;