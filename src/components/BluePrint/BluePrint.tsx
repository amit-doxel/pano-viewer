import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const MOUSE_DOWN_EVENT = 'mouse:down';
const MOUSE_UP_EVENT = 'mouse:up';
const MOUSE_MOVE_EVENT = 'mouse:move';
const MOUSE_WHEEL_EVENT = 'mouse:wheel';

const imgUrl =
  'https://storage.googleapis.com/prod-doxel-projects/FB-VLL-B6-2020/design/blueprints/FB-B6.png?GoogleAccessId=doxel-storage-admin%40doxel-prod.iam.gserviceaccount.com&Expires=1634508044&Signature=varDCylQxG%2B9eaH3akZFG5GXdD0R7cLk1Dpb58Bxz2%2FEb0YnN0FSFpUH%2FxUlSzRzotfYliYmj%2F8o8UM4Q0EaZACx4c%2FogvteagDbhnz9Y3F1KeC5F2eINq%2Bu%2FaLp1krQXOG7CdFJ3f6voFNFMHQ9QzlorYaPLnJdFTES7sneMCjoXFoWM96IAw6l8K7CQOUP8GNd7avD6JB94MgUxUTrPPvj5Tivqm3qUBGh%2BZFLDLx4ar6Bhr2GOjz9nu0VP%2BmF6AesOpmalMubNngF0A%2FQx8yubJyXcyLS8DdobWOewq5%2FC7LRapPzbrIt4cYWGLZFGJltb3MIdVJfGiE0lM6GJA%3D%3D';

const PIN_PATH = 'M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z';

const markers =
  [{
    "id":601551,
    "x":2739.10927713213,
    "y":1257.77233175672
   },{"id":601549,"x":2737.63713634947,"y":1213.58543237168},{"id":601547,"x":2733.82318208945,"y":1159.44777037879},{"id":601546,"x":2714.00816049467,"y":1121.06683732843},{"id":601544,"x":2711.61179040663,"y":1058.87260558178},{"id":601543,"x":2708.42530757901,"y":1018.24683560627},{"id":601542,"x":2710.80966580648,"y":979.109304972959},{"id":601540,"x":2711.47000725262,"y":914.977779963383},{"id":601538,"x":2712.36060091456,"y":864.433082039519},{"id":601536,"x":2714.37639210908,"y":813.028150314776},{"id":601535,"x":2733.68738493407,"y":775.941622449756},{"id":601533,"x":2731.37416043307,"y":734.299103442532},{"id":601530,"x":2795.90841535938,"y":739.911329639093},{"id":601528,"x":2770.78045983825,"y":780.333049049559},{"id":601527,"x":2770.18514471172,"y":823.015302155232},{"id":601526,"x":2770.85898222495,"y":860.841747164883},{"id":601525,"x":2769.89766074704,"y":901.813402198424},{"id":601524,"x":2769.76650463226,"y":942.574092778223},{"id":601522,"x":2809.936780879,"y":952.816145835368},{"id":601521,"x":2809.77683190497,"y":913.666605081802},{"id":601520,"x":2809.32512153702,"y":872.573780784176},{"id":601519,"x":2808.73932267041,"y":830.689560219496},{"id":601518,"x":2809.68576968811,"y":785.171724070098},{"id":601516,"x":2853.61324148696,"y":767.7404358155},{"id":601514,"x":2853.57393825464,"y":837.199726103636},{"id":601512,"x":2854.29361361016,"y":904.155850800193},{"id":601511,"x":2852.84807845319,"y":946.708370664543},{"id":601509,"x":2892.80389286863,"y":941.359278853903},{"id":601508,"x":2891.51310481425,"y":900.173103346111},{"id":601507,"x":2892.91528728483,"y":859.393215288948},{"id":601506,"x":2891.43702714152,"y":818.539054684075},{"id":601505,"x":2892.90360428781,"y":778.155700627976},{"id":601502,"x":2924.04828030943,"y":755.312771657485},{"id":601500,"x":2929.57869379834,"y":792.790262860944},{"id":601498,"x":2929.28198802721,"y":867.959630068963},{"id":601497,"x":2930.10886472651,"y":907.645292192192},{"id":601495,"x":2946.3872733969,"y":963.814607245851},{"id":601493,"x":2974.52426121712,"y":925.092830499529},{"id":601492,"x":2974.97505260279,"y":886.927021566258},{"id":601491,"x":2971.97882511409,"y":847.852548367353},{"id":601490,"x":2974.20815099882,"y":804.700870784396},{"id":601489,"x":2973.95195246158,"y":766.431644691707},{"id":601487,"x":2996.07692756492,"y":734.059895079707},{"id":601485,"x":3011.26760418026,"y":789.666440369587},{"id":601484,"x":3011.0279803079,"y":829.472809589806},{"id":601483,"x":3009.967801424,"y":872.707853877357},{"id":601482,"x":3011.73086359315,"y":916.165316352897},{"id":601481,"x":3013.03463823569,"y":960.172601502403},{"id":601479,"x":3050.60834323082,"y":931.979006824626},{"id":601478,"x":3049.87936214677,"y":890.769134066946},{"id":601477,"x":3050.17096923705,"y":846.938454727719},{"id":601476,"x":3050.24871150895,"y":803.906134312791},{"id":601474,"x":3053.39012182254,"y":733.494804978016},{"id":601472,"x":3095.01798637218,"y":769.161519747178},{"id":601470,"x":3095.09060984628,"y":833.450550214709},{"id":601468,"x":3092.82539240402,"y":911.527024364337},{"id":601467,"x":3093.68485319652,"y":956.589894448784},{"id":601464,"x":3073.94917148977,"y":1013.12617849322},{"id":601462,"x":3031.6120140143,"y":994.890475534739},{"id":601460,"x":2982.71013008668,"y":1013.12664127363},{"id":601458,"x":2923.76279272836,"y":1015.6368016016},{"id":601456,"x":2860.35660989116,"y":1013.85959958458},{"id":601454,"x":2801.47319881068,"y":1014.95263809363},{"id":601452,"x":2739.96657382446,"y":1014.4537006384},{"id":601450,"x":2770.30244583127,"y":1066.35516502672},{"id":601448,"x":2771.83182250839,"y":1147.23627818823},{"id":601447,"x":2772.15287016375,"y":1189.18587734144},{"id":601445,"x":2783.13500311823,"y":1263.21764229423},{"id":601443,"x":2810.54402340045,"y":1216.50933753534},{"id":601442,"x":2810.0290387975,"y":1177.61958461835},{"id":601441,"x":2809.30579628218,"y":1138.43360955526},{"id":601439,"x":2809.81413172459,"y":1068.24855560039},{"id":601437,"x":2852.51731261005,"y":1084.85035629326},{"id":601436,"x":2853.76574714691,"y":1124.94514126626},{"id":601434,"x":2855.38475668905,"y":1205.38837701806},{"id":601433,"x":2853.38632258201,"y":1244.75899228805},{"id":601431,"x":2891.76161042176,"y":1241.35669596043},{"id":601430,"x":2893.27406498734,"y":1196.69105529358},{"id":601429,"x":2891.85213031731,"y":1148.1728433106},{"id":601428,"x":2891.7923518256,"y":1105.19731534673},{"id":601426,"x":2927.08116581743,"y":1063.84051077046},{"id":601425,"x":2930.18114531426,"y":1102.50821325661},{"id":601423,"x":2929.50702670469,"y":1181.16210779441},{"id":601422,"x":2929.09197470875,"y":1220.86787662644},{"id":601421,"x":2933.35054038597,"y":1262.70579886911},{"id":601419,"x":2975.3654361938,"y":1225.4077620457},{"id":601418,"x":2975.46599966124,"y":1179.04484252123},{"id":601417,"x":2974.63231670193,"y":1131.38642565551},{"id":601415,"x":2984.42770275963,"y":1065.05880543502},{"id":601413,"x":3011.76803404867,"y":1104.83617377279},{"id":601412,"x":3012.75765417681,"y":1143.97535311331},{"id":601411,"x":3012.60450549287,"y":1184.71401539096},{"id":601410,"x":3011.6076722531,"y":1228.56751985575},{"id":601408,"x":3051.66813573978,"y":1257.13362901804},{"id":601407,"x":3050.49837129174,"y":1219.08243809816},{"id":601406,"x":3051.11200880597,"y":1173.49972317422},{"id":601405,"x":3049.89749227261,"y":1126.63191346263},{"id":601403,"x":3067.85627059042,"y":1065.78096267536},{"id":601401,"x":3094.83244829226,"y":1109.96476927499},{"id":601400,"x":3094.51878416426,"y":1148.89406221096},{"id":601398,"x":3095.46143085283,"y":1219.90907523802},{"id":601397,"x":3095.2451400849,"y":1260.35883801552},{"id":601395,"x":3060.81354614688,"y":1290.28999660267},{"id":601394,"x":3019.68772461318,"y":1290.68997083554},{"id":601393,"x":2978.54516875454,"y":1290.43878835363},{"id":601392,"x":2935.69671020203,"y":1289.73358590236},{"id":601391,"x":2892.592322391,"y":1290.48083753375},{"id":601390,"x":2847.99688503463,"y":1290.69218413479},{"id":601389,"x":2803.93715160246,"y":1289.7970513597},{"id":601388,"x":2759.79600492707,"y":1290.2932524784},{"id":601387,"x":2713.88966738279,"y":1286.41200358947},{"id":601386,"x":2715.01172013758,"y":1325.36023170831},{"id":601385,"x":2669.9067746537,"y":1319.97127986232},{"id":601381,"x":2612.8106276442,"y":1340.47753854509},{"id":601380,"x":2658.00632773049,"y":1340.58000747957},{"id":601379,"x":2701.6561032862,"y":1335.38900846051},{"id":601377,"x":2774.91743985524,"y":1334.03837512983},{"id":601376,"x":2819.54475421328,"y":1327.28666616295},{"id":601375,"x":2867.6755909059,"y":1330.06925267063},{"id":601374,"x":2910.99142077077,"y":1332.42763281409},{"id":601373,"x":2955.14875905658,"y":1330.96078677876},{"id":601372,"x":3000.66965968914,"y":1332.14693516034},{"id":601371,"x":3043.57017487294,"y":1331.04892581708},{"id":601738,"x":3133.00407675991,"y":1331.12022277071},{"id":601737,"x":3178.30311696073,"y":1331.55474519713},{"id":601736,"x":3222.74046808481,"y":1333.73170899159},{"id":601735,"x":3259.87373028462,"y":1332.48442747323},{"id":601734,"x":3302.20620067402,"y":1331.71492798223},{"id":601733,"x":3349.97469389153,"y":1332.13881865595},{"id":601732,"x":3396.46840492711,"y":1332.56739163516},{"id":601731,"x":3441.07815739252,"y":1330.10220211119},{"id":601730,"x":3483.42894355824,"y":1332.0764400529},{"id":601729,"x":3524.42121472648,"y":1332.7876858174},{"id":601728,"x":3570.72454682108,"y":1335.76780489184},{"id":601727,"x":3575.42740358148,"y":1294.95918200844},{"id":601725,"x":3547.96782426599,"y":1263.80611465118},{"id":601723,"x":3556.1446387555,"y":1216.87224674453},{"id":601722,"x":3530.23119527795,"y":1186.69650905245},{"id":601721,"x":3551.22759594525,"y":1154.96159098238},{"id":601720,"x":3532.47463226308,"y":1116.39118615687},{"id":601718,"x":3544.87578283883,"y":1067.61018966766},{"id":601716,"x":3493.88176845509,"y":1093.2750045126},{"id":601715,"x":3493.07712945951,"y":1138.80869738823},{"id":601714,"x":3495.1044716059,"y":1186.19920546164},{"id":601713,"x":3501.7126172603,"y":1227.13115048411},{"id":601711,"x":3476.33212894909,"y":1292.85621410395},{"id":601709,"x":3457.45230510603,"y":1251.74108878811},{"id":601708,"x":3457.09628484962,"y":1213.5277445128},{"id":601707,"x":3458.59434135627,"y":1171.45963042522},{"id":601706,"x":3456.69102843196,"y":1127.19657960652},{"id":601705,"x":3456.07051389053,"y":1070.89617779285},{"id":601703,"x":3411.70820728682,"y":1086.62301830085},{"id":601701,"x":3411.95009113216,"y":1165.58492595492},{"id":601700,"x":3411.76993014478,"y":1205.01208290207},{"id":601699,"x":3411.08828663989,"y":1247.67165597204},{"id":601697,"x":3406.37490649793,"y":1293.17020670251},{"id":601695,"x":3373.96832079702,"y":1252.44547941678},{"id":601694,"x":3371.43586791322,"y":1210.02525482302},{"id":601693,"x":3374.39377369969,"y":1169.24009571153},{"id":601692,"x":3374.90235555929,"y":1124.77847573978},{"id":601691,"x":3375.75796235636,"y":1077.7521748346},{"id":601689,"x":3335.69690245602,"y":1096.35377531923},{"id":601688,"x":3336.27711196866,"y":1138.31629251496},{"id":601687,"x":3335.82250168073,"y":1176.97446221453},{"id":601686,"x":3336.39678909148,"y":1215.88165679278},{"id":601685,"x":3336.51862797063,"y":1258.09184276658},{"id":601683,"x":3297.65877530462,"y":1294.62614218705},{"id":601681,"x":3291.99051607224,"y":1225.93605488699},{"id":601680,"x":3291.68144321618,"y":1185.30424100378},{"id":601679,"x":3291.24290170893,"y":1142.91394601879},{"id":601678,"x":3291.58976576659,"y":1097.81560957821},{"id":601676,"x":3254.51949957824,"y":1070.54977507329},{"id":601675,"x":3254.17333924004,"y":1114.01222402462},{"id":601674,"x":3253.07484442253,"y":1156.95545619412},{"id":601673,"x":3252.4577458012,"y":1198.27724172865},{"id":601672,"x":3251.49737071779,"y":1236.14042536919},{"id":601670,"x":3237.39944014945,"y":1292.68155921806},{"id":601668,"x":3216.53218663874,"y":1249.73095813192},{"id":601667,"x":3215.98955997062,"y":1207.50391958265},{"id":601666,"x":3215.69234358614,"y":1162.34694191824},{"id":601665,"x":3215.98975034922,"y":1119.49841321351},{"id":601664,"x":3216.82704243342,"y":1077.13217152993},{"id":601662,"x":3171.04590972465,"y":1079.12230051708},{"id":601660,"x":3170.87973684751,"y":1156.70420340685},{"id":601659,"x":3171.13486870861,"y":1197.54996171573},{"id":601658,"x":3160.73536686095,"y":1236.32159942759},{"id":601656,"x":3178.23105475297,"y":1288.75084855787},{"id":601654,"x":3134.28250179947,"y":1273.24367314148},{"id":601653,"x":3132.9840799431,"y":1235.09672098408},{"id":601652,"x":3133.56171888179,"y":1195.24376225171},{"id":601651,"x":3134.60974143027,"y":1155.28604804549},{"id":601650,"x":3133.43017676983,"y":1113.06686403299},{"id":601649,"x":3133.11918973846,"y":1069.47448054989},{"id":601647,"x":3141.41224830381,"y":1012.6387845688},{"id":601645,"x":3192.7042892074,"y":1016.05267904898},{"id":601643,"x":3255.58482933107,"y":1014.03261631404},{"id":601641,"x":3315.3335089463,"y":1016.02831928154},{"id":601639,"x":3376.96806320674,"y":1015.04518269705},{"id":601637,"x":3440.44536219475,"y":1013.49768176418},{"id":601635,"x":3502.23901649716,"y":1016.73475379759},{"id":601633,"x":3571.66625701238,"y":1008.6911446346},{"id":601632,"x":3571.97108938614,"y":970.547481420363},{"id":601630,"x":3533.55540587071,"y":923.538007238451},{"id":601628,"x":3548.7411820858,"y":863.253614003737},{"id":601626,"x":3532.86174220931,"y":810.1730873127},{"id":601624,"x":3534.55249619433,"y":766.831792879715},{"id":601622,"x":3494.24616184557,"y":802.635630215016},{"id":601621,"x":3493.79087565264,"y":847.523264811798},{"id":601620,"x":3493.13786527063,"y":893.7038593449},{"id":601617,"x":3457.91138466909,"y":952.425530398627},{"id":601616,"x":3459.18185234428,"y":913.33548254935},{"id":601615,"x":3456.38806543879,"y":873.048371629657},{"id":601614,"x":3457.83603456299,"y":831.818607709241},{"id":601612,"x":3442.39211654898,"y":765.946777749261},{"id":601610,"x":3412.29733298004,"y":803.099733227582},{"id":601609,"x":3411.84980854019,"y":844.229261928127},{"id":601608,"x":3411.60356599632,"y":886.658966283796},{"id":601607,"x":3412.08210732823,"y":930.719449235101},{"id":601605,"x":3375.84468993571,"y":963.40752737464},{"id":601604,"x":3373.98618347502,"y":923.237307452138},{"id":601603,"x":3372.95062835056,"y":879.440963049346},{"id":601602,"x":3372.37458661947,"y":833.332977945438},{"id":601601,"x":3374.57544148488,"y":786.604601017922},{"id":601599,"x":3336.39725725474,"y":789.847976623467},{"id":601598,"x":3335.35425474579,"y":836.381688591999},{"id":601597,"x":3335.54745335254,"y":881.068343372754},{"id":601595,"x":3336.1240157743,"y":964.612401003404},{"id":601593,"x":3292.78320417358,"y":943.498166199322},{"id":601592,"x":3291.87002949191,"y":898.624998743626},{"id":601591,"x":3291.68318326418,"y":853.818413676341},{"id":601589,"x":3285.13436372814,"y":766.597942629493},{"id":601587,"x":3242.82466013955,"y":798.455571414903},{"id":601586,"x":3252.28159327324,"y":839.360101020793},{"id":601585,"x":3253.18279617909,"y":885.852270512614},{"id":601583,"x":3270.51073799084,"y":960.483130630062},{"id":601581,"x":3216.5002442979,"y":951.367601850512},{"id":601580,"x":3215.66373584539,"y":910.966367774279},{"id":601579,"x":3215.47860818969,"y":868.291559309975},{"id":601578,"x":3215.13642662331,"y":824.896150314724},{"id":601577,"x":3216.61963098658,"y":777.256107421341},{"id":601575,"x":3170.87465805981,"y":782.475271044801},{"id":601574,"x":3174.01227302021,"y":826.562452851191},{"id":601573,"x":3170.74328056458,"y":869.549756133554},{"id":601572,"x":3171.31240009739,"y":915.139716297794},{"id":601571,"x":3171.55796866005,"y":962.001683297673},{"id":601569,"x":3133.94232608191,"y":928.798698373797},{"id":601568,"x":3133.94619266425,"y":884.758464481401},{"id":601567,"x":3134.04015001285,"y":841.853747528403},{"id":601566,"x":3134.51352633185,"y":797.15225846851},{"id":601564,"x":3120.18680415386,"y":737.794522404276},{"id":601562,"x":3187.78576638166,"y":739.619549167928},{"id":601560,"x":3258.25140523497,"y":735.942107234237},{"id":601559,"x":3298.32409118354,"y":735.800875149336},{"id":601558,"x":3340.88181232541,"y":735.882539570024},{"id":601557,"x":3382.53675803177,"y":735.817922255581},{"id":601556,"x":3426.14396156438,"y":736.467550693453},{"id":601555,"x":3464.25311693103,"y":737.082696735202},{"id":601554,"x":3505.41765179758,"y":736.114074056337}]

interface PanoMarker {
  id: number;
  x: number;
  y: number;
}

interface Props {
  bgImageUrl ?: string;
  selectedMarkerId ?: string;
  selectionType ?: 'higlight' | 'pin';
  markers ?: PanoMarker[],
  onMarkerSelected ?: (markerId: string) => void
}

const BluePrint: React.FC<Props> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const { clientWidth, clientHeight } = wrapperRef.current;

    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const canvas$ = new fabric.Canvas(canvas, { selection: false });

    fabric.Image.fromURL(
      imgUrl,
      function (img$: fabric.Image) {
        addImageToCanvas(canvas$, img$);

        const imgScaleFactor = getFabricImageScaleFactor(img$);
        const topImgOffset = img$.get('top');
        const leftImgOffset = img$.get('left');

        addWalkPathToCanvas(canvas$, markers, {
          imgScaleFactor,
          topImgOffset,
          leftImgOffset
        });

        /*const markers$ =*/ addMarkersToCanvas(canvas$, markers, {
          imgScaleFactor,
          topImgOffset,
          leftImgOffset
        });


      },
      {
        borderColor: 'transparent',
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        lockRotation: true,
        selectable: false
      }
    );

    enableZoom(canvas$);
    enablePanning(canvas$);

    return () => {
      cleanUpEvents(canvas$);
    }

  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue',
        borderRadius: 2,
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

// resize and offset image to fit nicely in the container
function resizeOffsetBlueprintImage(
  img$: fabric.Image,
  containerWidth: number,
  containerHeight: number
) {
  const imgWidth = img$.get('width') || 1;
  const imgHeight = img$.get('height') || 1;

  const widthToHeightRatio = imgWidth / imgHeight;

  const isLandscape = widthToHeightRatio > 1;

  let topImgOffset;

  if (isLandscape) {
    img$.scaleToWidth(containerWidth);

    const heightToWidthRatio = imgHeight / imgWidth;
    const scaledImgHeight = containerWidth * heightToWidthRatio;
    topImgOffset = (containerHeight - scaledImgHeight) / 2;

    img$.set({ top: topImgOffset });
  } else {
    console.warn(
      'WARNING: Horizonal Initial image offseting is not implemented yet',
    );
    img$.scaleToHeight(containerHeight);
  }

  return img$;
}

const ZOOM_IN_MAX = 10;

function getZoomFromMouseWheelEvent(
  canvas$: fabric.Canvas,
  e: fabric.IEvent<WheelEvent>
) {
  const delta = e.e.deltaY;
  const zoom = canvas$.getZoom();
  const zoomBy = ( 0.999 ** delta );
  let newZoom = zoom * zoomBy;

  if (newZoom > ZOOM_IN_MAX) newZoom = ZOOM_IN_MAX;

  if (newZoom < 1) newZoom = 1;

  return newZoom;
}

function handleZoomEvent(
  canvas$: fabric.Canvas,
  event$: fabric.IEvent<WheelEvent>
) : void {

  let newZoom = getZoomFromMouseWheelEvent(canvas$, event$)

  const {offsetX, offsetY } = event$.e;

  canvas$.zoomToPoint({ x: offsetX, y: offsetY }, newZoom);
}

// make sure canvas viewport stays within constraints
function handleBorderConstraints(
  canvas$: fabric.Canvas,
) : void {
  const zoom = canvas$.getZoom();

  const canvasViewportTransform = canvas$.viewportTransform!;

  const leftViewPortOffset = canvasViewportTransform[4];
  const topViewPortOffset = canvasViewportTransform[5];

  const canvasWidthOfZoom = canvas$.width! * (zoom - 1);
  const canvasHeightOfZoom = canvas$.height! * (zoom - 1);

  let offsetXValue;

  if ( leftViewPortOffset > 0 ) {
    // viewport goes beyound left border
    offsetXValue = 0
  } else if ( leftViewPortOffset < 0 && Math.abs(leftViewPortOffset) > canvasWidthOfZoom ) {
    // viewport goes beyound right border
    offsetXValue = leftViewPortOffset + ( ( Math.abs(leftViewPortOffset) - canvasWidthOfZoom ) );
  } else {
    // viewport is within left and right borders
    offsetXValue = leftViewPortOffset;
  }

  let offsetYValue;

  if ( topViewPortOffset > 0 ) {
    // viewport goes beyound top border
    offsetYValue = 0
  } else if ( topViewPortOffset < 0 && Math.abs(topViewPortOffset) > canvasHeightOfZoom ) {
    // viewport goes beyound bottom border
    offsetYValue = topViewPortOffset + ( ( Math.abs(topViewPortOffset) - canvasHeightOfZoom ) );
  } else {
    // viewport is within top and down borders
    offsetYValue = topViewPortOffset;
  }

  const newVeiewportTranform = [
    ...canvasViewportTransform.slice(0, 4),
    offsetXValue,
    offsetYValue
  ];

  canvas$.setViewportTransform(newVeiewportTranform);
}

function enableZoom(
  canvas$: fabric.Canvas
) : void {
  // TODO: implement logic that unsucbsribes from events
  canvas$.on(MOUSE_WHEEL_EVENT, function(event$: fabric.IEvent<WheelEvent>) {

    handleZoomEvent(
      canvas$,
      event$
    );

    handleBorderConstraints(canvas$);

    event$.e.preventDefault();
    event$.e.stopPropagation();
  })
}

// TODO: implement logic that unsucbsribes from events
function enablePanning(
  canvas$: fabric.Canvas
) {
  let isPanning = false;

  canvas$.on(MOUSE_DOWN_EVENT, () => {
    isPanning = true;
  })

  canvas$.on(MOUSE_UP_EVENT, () => {
    isPanning = false;
  })

  canvas$.on(MOUSE_MOVE_EVENT, (
    event$: fabric.IEvent<MouseEvent>
  ) => {
    if (!isPanning) return;

    const moveX = event$.e.movementX;
    const moveY = event$.e.movementY;

    const canvasViewportTransform = canvas$.viewportTransform!;

    const leftViewPortOffset = canvasViewportTransform[4];
    const topViewPortOffset = canvasViewportTransform[5];

    const newCanvasXOffset = leftViewPortOffset + moveX;
    const newCanvasYOffset = topViewPortOffset + moveY;

    const zoom = canvas$.getZoom();

    const canvasWidthOfZoom = canvas$.width! * (zoom - 1);
    const canvasHeightOfZoom = canvas$.height! * (zoom - 1);

    const canDoHorizonMove = newCanvasXOffset < 0 && Math.abs(newCanvasXOffset) < canvasWidthOfZoom;
    const canDoVertMove = newCanvasYOffset < 0 && Math.abs(newCanvasYOffset) < canvasHeightOfZoom;

    const movePoint = new fabric.Point(
      canDoHorizonMove ? moveX : 0,
      canDoVertMove ? moveY : 0
    );

    canvas$.relativePan(movePoint);
  });
}

// adding image to canvas has a side effect of scaling the image
// so it fits the canvas
function addImageToCanvas(
  canvas$: fabric.Canvas,
  img$: fabric.Image
) {
  const canvasWidth = canvas$.width || 1;
  const canvasHeight = canvas$.height || 1;

  resizeOffsetBlueprintImage(
    img$,
    canvasWidth,
    canvasHeight
  );

  img$.lockMovementY = true;
  img$.lockMovementX = true;

  canvas$.add(img$)
}

function cleanUpEvents(
  canvas$: fabric.Canvas
) {
  canvas$.off(MOUSE_DOWN_EVENT);
  canvas$.off(MOUSE_UP_EVENT);
  canvas$.off(MOUSE_MOVE_EVENT);
  canvas$.off(MOUSE_WHEEL_EVENT);
}

interface BlueprintRenderOpts {
  imgScaleFactor ?: number;
  topImgOffset ?: number;
  leftImgOffset ?: number;
}

const BLUEPRINT_RENDER_OPTS_INIT_STATE = {
  imgScaleFactor: 0,
  topImgOffset: 0,
  leftImgOffset: 0,
};

const MARKER_RADIUS = 5;
const MARKER_COLOR = '#19ACCC';

function addMarkersToCanvas(
  canvas$: fabric.Canvas,
  markers: PanoMarker[],
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE
) {

  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;

  const markers$: fabric.Circle[] = [];

  markers.forEach((marker) => {

    const {id, x, y} = marker;
    const circle$ = new fabric.Circle({
      radius: MARKER_RADIUS,
      fill: MARKER_COLOR,
      left: x * imgScaleFactor - MARKER_RADIUS + leftImgOffset,
      top: y * imgScaleFactor + topImgOffset - MARKER_RADIUS,
      strokeWidth: 0,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementY: true,
      lockMovementX: true,
      selectable: false,
      opacity: 0.5
    });

    markers$.push(circle$);

    circle$.on('mouseup', () => {
      addPinToCanvas(canvas$, marker, opts);
      console.log('clicked marker with id', id)
    })

    canvas$.add(circle$)
  });


  return markers$;
}

function getFabricImageScaleFactor(img$: fabric.Image) {
  return Math.sqrt( (img$.getScaledHeight() * img$.getScaledWidth() ) / (img$.height! * img$.width!) );
}

const WALK_PATH_COLOR = '#009BD0';
const WALK_PATH_WIDTH = 2;

function addWalkPathToCanvas(
  canvas$: fabric.Canvas,
  markers: PanoMarker[],
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE
) : void {

  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;

  const pathStr = markers.reduce((acc, {x, y}) => {
    return acc + ` ${x * imgScaleFactor + leftImgOffset} ${y * imgScaleFactor + topImgOffset}`;
  }, 'M');

  var path = new fabric.Path(pathStr, {
    fill: 'transparent',
    stroke: WALK_PATH_COLOR,
    strokeWidth: WALK_PATH_WIDTH,

    borderColor: 'transparent',
    hasBorders: false,
    hasControls: false,
    hasRotatingPoint: false,
    lockRotation: true,
    selectable: false
  });

  canvas$.add(path);
}

const PIN_HEIGHT = 10;

function addPinToCanvas(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE
) {

  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;

  const pin$ = new fabric.Path(PIN_PATH);
  pin$.scaleToHeight(PIN_HEIGHT);
  //  const pinLeftOffset = -(globalPin.getScaledWidth() / 2);
  //  const pinTopOffset = -globalPin.getScaledHeight();
  const {
    x, y
  } = marker;

  const left = x * imgScaleFactor + topImgOffset - (pin$.getScaledWidth());
  const top = y * imgScaleFactor + leftImgOffset - pin$.getScaledHeight();

  pin$.set({
    left,
    top
  });

  canvas$.add(pin$)
}

export default BluePrint;
