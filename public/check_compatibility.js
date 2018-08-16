try {
  eval('async () => {}');
} catch (e) {
  window.location = '/incompatible';
}
