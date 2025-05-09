import { Th } from './th';

const TableHeader = ({
  type,
  reversed,
  sortBy,
  callback,
}: {
  type: string;
  reversed: any;
  sortBy: any;
  callback: any;
}) => {
  if (type === 'patients') {
    return (
      <>
        <Th sorted={sortBy === 'name'} reversed={reversed} onSort={() => callback('name')}>
          Prénom
        </Th>
        <Th sorted={sortBy === 'lastName'} reversed={reversed} onSort={() => callback('lastName')}>
          Nom de Famille
        </Th>
        <Th sorted={sortBy === 'birthDate'} reversed={reversed} onSort={() => callback('birthDate')}>
          Date de Naissance
        </Th>
        <Th sorted={sortBy === 'email'} reversed={reversed} onSort={() => callback('email')}>
          Adresse Mail
        </Th>
      </>
    );
  }

  if (type === 'appointments') {
    return (
      <>
        <Th sorted={sortBy === 'name'} reversed={reversed} onSort={() => callback('name')}>
          Prénom
        </Th>
        <Th sorted={sortBy === 'lastName'} reversed={reversed} onSort={() => callback('lastName')}>
          Nom de Famille
        </Th>
        <Th sorted={sortBy === 'date'} reversed={reversed} onSort={() => callback('date')}>
          Date
        </Th>
        <Th sorted={sortBy === 'kind'} reversed={reversed} onSort={() => callback('kind')}>
          Type
        </Th>
      </>
    );
  }

  if (type === 'accounting') {
    return (
      <>
        <Th sorted={sortBy === 'amount'} reversed={reversed} onSort={() => callback('amount')}>
          Montant
        </Th>
        <Th sorted={sortBy === 'patientName'} reversed={reversed} onSort={() => callback('patientName')}>
          Patient
        </Th>
        <Th sorted={sortBy === 'date'} reversed={reversed} onSort={() => callback('date')}>
          Date
        </Th>
        <Th sorted={sortBy === 'method'} reversed={reversed} onSort={() => callback('method')}>
          Méthode
        </Th>
      </>
    );
  }

  if (type === 'users') {
    return (
      <>
        <Th sorted={sortBy === 'name'} reversed={reversed} onSort={() => callback('name')}>
          Account
        </Th>
        <Th sorted={sortBy === 'state'} reversed={reversed} onSort={() => callback('state')}>
          State
        </Th>
        <Th sorted={sortBy === 'lastActive'} reversed={reversed} onSort={() => callback('lastActive')}>
          Last Active
        </Th>
        <Th sorted={sortBy === 'role'} reversed={reversed} onSort={() => callback('role')}>
          Role
        </Th>
      </>
    );
  }
};

export { TableHeader };
