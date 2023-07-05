const modules = import.meta.glob(
  './lib/**/!(*.spec|*.test|*.stories).@(ts|js)',
  { eager: true }
)
export { modules as default, modules }
