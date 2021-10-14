import BluePrint from '../BluePrint/BluePrint';

const FloorPlan: React.FC = () => {
  return <div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{width: '90%', height: '80%', backgroundColor: 'lightgrey'}}>
      <BluePrint />
    </div>
  </div>;
}

export default FloorPlan;
