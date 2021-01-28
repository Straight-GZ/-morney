let id = parseInt(window.localStorage.getItem('_maxId') || '0') || 0;

function createId() {
  id++;
  window.localStorage.setItem('_maxId', id.toString());
  return id;
}

export default createId;