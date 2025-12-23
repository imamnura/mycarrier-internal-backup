import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  ticketId: yup.string().required().label('Ticket ID'),
});

export default yupResolver(validation);
