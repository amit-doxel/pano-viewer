import BluePrint, {DEFAULT_MARKERS} from '../BluePrint/BluePrint';

export const MiniMap: React.FC = () => {
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
    <BluePrint
      markers={DEFAULT_MARKERS}
      bgImageUrl={''}
    />
    </div>
  );
};
