import BluePrint from '../BluePrint/BluePrint';

const MiniMap: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        width: '180px',
        height: '180px',
        backgroundColor: 'lightblue',
        borderRadius: 2,
      }}
    >
      <BluePrint />
    </div>
  );
};

export default MiniMap;
