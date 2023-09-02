// eslint-disable-next-line import/no-cycle

/*
 * @Author: Roden Wild
 * @Date: 2023-09-02
 * @FilePath: /src/algorithms/controllers/quickSortCollapseChunkPlugin.js
 * @Description: logic for quickSort reachability
 */

const QS_NAME = 'quickSort';

let algorithmGetter = () => null;

function getGlobalAlgorithm() {
  return algorithmGetter();
}

window.getGlobalAlgorithm = getGlobalAlgorithm;
export function initGlobalAlgorithmGetterQS(getter) {
  algorithmGetter = getter;
}

export function isIJVarCollapsed() {
  const algorithm = getGlobalAlgorithm();
  if (algorithm.id.name !== QS_NAME) return false;
  // , playing, chunker
  const { bookmark, pseudocode, collapse } = algorithm;

  return collapse.quickSort.sort.Partition;
}
