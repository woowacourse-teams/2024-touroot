const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// SVG 디렉토리 경로 설정
const svgDir = path.join(__dirname, "src/assets/svg");

// JSON 출력 파일 경로 설정
const outputJsonFile = path.join(__dirname, "/src/components/common/Icon/svg-icons.json");

// SVG 파일을 Path 요소로 변환하는 함수들
const convertCircleToPath = (circle) => {
  const cx = parseFloat(circle.$.cx);
  const cy = parseFloat(circle.$.cy);
  const r = parseFloat(circle.$.r);

  return `M ${cx - r}, ${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 ${-r * 2},0`;
};

const convertRectToPath = (rect) => {
  const x = parseFloat(rect.$.x || 0);
  const y = parseFloat(rect.$.y || 0);
  const width = parseFloat(rect.$.width);
  const height = parseFloat(rect.$.height);

  return `M ${x},${y} H ${x + width} V ${y + height} H ${x} Z`;
};

const convertEllipseToPath = (ellipse) => {
  const cx = parseFloat(ellipse.$.cx);
  const cy = parseFloat(ellipse.$.cy);
  const rx = parseFloat(ellipse.$.rx);
  const ry = parseFloat(ellipse.$.ry);

  return `M ${cx - rx}, ${cy} a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;
};

const convertLineToPath = (line) => {
  const x1 = parseFloat(line.$.x1);
  const y1 = parseFloat(line.$.y1);
  const x2 = parseFloat(line.$.x2);
  const y2 = parseFloat(line.$.y2);

  return `M ${x1},${y1} L ${x2},${y2}`;
};

const convertPolylineToPath = (polyline) => {
  const points = polyline.$.points.trim().split(/\s+|,/).map(parseFloat);
  let d = `M ${points[0]},${points[1]}`;
  for (let i = 2; i < points.length; i += 2) {
    d += ` L ${points[i]},${points[i + 1]}`;
  }
  return d;
};

const convertPolygonToPath = (polygon) => {
  const points = polygon.$.points.trim().split(/\s+|,/).map(parseFloat);
  let d = `M ${points[0]},${points[1]}`;
  for (let i = 2; i < points.length; i += 2) {
    d += ` L ${points[i]},${points[i + 1]}`;
  }
  return d + " Z";
};

const processElement = (element) => {
  let d = "";

  const processChildren = (children) => {
    if (children.circle) {
      children.circle.forEach((circle) => {
        d += ` ${convertCircleToPath(circle)}`;
      });
    }
    if (children.rect) {
      children.rect.forEach((rect) => {
        d += ` ${convertRectToPath(rect)}`;
      });
    }
    if (children.ellipse) {
      children.ellipse.forEach((ellipse) => {
        d += ` ${convertEllipseToPath(ellipse)}`;
      });
    }
    if (children.line) {
      children.line.forEach((line) => {
        d += ` ${convertLineToPath(line)}`;
      });
    }
    if (children.polyline) {
      children.polyline.forEach((polyline) => {
        d += ` ${convertPolylineToPath(polyline)}`;
      });
    }
    if (children.polygon) {
      children.polygon.forEach((polygon) => {
        d += ` ${convertPolygonToPath(polygon)}`;
      });
    }
    if (children.path) {
      children.path.forEach((path) => {
        d += ` ${path.$.d}`;
      });
    }
    if (children.g) {
      children.g.forEach(processChildren);
    }
  };

  processChildren(element);

  return d.trim();
};

const processSvgFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  const parser = new xml2js.Parser();

  return new Promise((resolve, reject) => {
    parser.parseString(data, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const svg = result.svg;
      const viewBox = svg.$.viewBox
        ? svg.$.viewBox.split(" ").map(Number)
        : [0, 0, parseInt(svg.$.width, 10), parseInt(svg.$.height, 10)];

      const d = processElement(svg);

      // stroke 관련 속성 추출
      let strokeAttributes = {};
      if (svg.path && svg.path[0] && svg.path[0].$) {
        strokeAttributes = svg.path[0].$;
      } else if (svg.$ && svg.$.stroke) {
        strokeAttributes = svg.$;
      }

      const stroke = strokeAttributes.stroke || "currentColor";
      const strokeWidth = strokeAttributes["stroke-width"] || "1";
      const strokeLinecap = strokeAttributes["stroke-linecap"] || "butt";
      const strokeLinejoin = strokeAttributes["stroke-linejoin"] || "miter";

      resolve({
        fileName: path.basename(filePath, ".svg"),
        width: viewBox[2],
        height: viewBox[3],
        path: d,
        stroke,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
      });
    });
  });
};

const processSvgDirectory = async (svgDir) => {
  if (!fs.existsSync(svgDir)) {
    console.error(`Directory not found: ${svgDir}`);
    return;
  }

  const files = fs.readdirSync(svgDir).filter((file) => path.extname(file) === ".svg");
  const svgData = {};

  for (const file of files) {
    const filePath = path.join(svgDir, file);
    const data = await processSvgFile(filePath);
    svgData[data.fileName] = {
      width: data.width,
      height: data.height,
      path: data.path,
      stroke: data.stroke,
      strokeWidth: data.strokeWidth,
      strokeLinecap: data.strokeLinecap,
      strokeLinejoin: data.strokeLinejoin,
    };
  }

  fs.writeFileSync(outputJsonFile, JSON.stringify(svgData, null, 2));
  console.log("SVG icons have been converted and saved to JSON file.");
};

processSvgDirectory(svgDir).catch((err) => console.error(err));
