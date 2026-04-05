# Source - https://stackoverflow.com/a/13320450
# Posted by JWL, modified by community. See post 'Timeline' for change history
# Retrieved 2026-04-05, License - CC BY-SA 3.0

import cairosvg

filepath = "16-mtm/imgs/frey-curve-fullplot.svg"
cairosvg.svg2png(url=filepath, write_to=filepath.replace(".svg", ".png"), scale=4.0)