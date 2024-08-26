import { FC } from 'react';
import { Entry } from '../../types';
import { Container, Typography } from '@mui/material';
import { MedicalServices, Favorite, Work } from '@mui/icons-material';

function assertNever(value: never) {
    throw new Error("Unexpected value: " + value);
}

const HospitalEntry = ({ entry }) => {
    return (
        <Container sx={{ border: '1px solid black', padding: 2, borderRadius: 2, my: 3 }}>
            <Typography>{entry.date} - {entry.description}</Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
        </Container>
    )

}

const HealthCheckEntry = ({ entry }) => {
    return (
        <Container sx={{ border: '1px solid black', padding: 2, borderRadius: 2, my: 3 }}>
            <Typography>{entry.date} { <MedicalServices />}</Typography>

            { entry.healthCheckRating === 0 && <Favorite color={'success'}/> }
            { (entry.healthCheckRating === 1 || entry.healthCheckRating === 2) && <Favorite color={'warning'}/> }
            { entry.healthCheckRating === 3 && <Favorite color={'error'}/>}
            
            <Typography>{entry.description}</Typography>

            <Typography>diagnose by {entry.specialist}</Typography>
        </Container>
    )

}

const OccupationalHealthcareEntry = ({ entry }) => {
    return (
        <Container sx={{ border: '1px solid black', padding: 2, borderRadius: 2, my: 3 }}>
            <Typography>{entry.date} { <Work />} {entry.employerName}</Typography>
            <Typography>{entry.description}</Typography>

            <Typography>diagnose by {entry.specialist}</Typography>
        </Container>
    )

}



const EntryDetails: FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />

        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />

        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />

        default:
            return assertNever(entry);
    }

}

export default EntryDetails;