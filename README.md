# lasso-worker-transform

This is WIP.
Its used to transform files with extension '.worker.js' when included in the transform list of Lasso JS.
This transforms files which are JS web workers & wraps them with a module.exports so that they
can be required like any other JS file & used. They can also be bundled by Lasso JS.
