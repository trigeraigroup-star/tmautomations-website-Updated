export function stageAtProgress(progress) { return progress < .25 ? 0 : progress < .75 ? 1 : 2; }
