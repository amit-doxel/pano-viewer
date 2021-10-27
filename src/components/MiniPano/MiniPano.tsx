export const MiniPano = () => {
  const date = 'Aug 31, 2021 8:05 AM';
  const building = 'VB1';
  return (
    <div
      style={{
        color: 'white',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    >
      <div style={{ float: 'left', paddingLeft: '8px', paddingTop: '5px' }}>
        <img src='/assets/icons/up.svg' alt='up-icon'></img>
      </div>
      <div style={{ float: 'right', paddingRight: '8px', paddingTop: '8px' }}>
        <img src='/assets/icons/close.svg' alt='close-icon'></img>
      </div>
      <div style={{ paddingLeft: '20px', paddingTop: '40px' }}>
        <div style={{ marginBottom: '10px' }}>Title</div>
        <div>
          {date} | {building}
        </div>
      </div>
    </div>
  );
};
