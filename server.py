import json
import os

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
from tornado.ioloop import IOLoop
from jinja2 import Environment, FileSystemLoader, TemplateNotFound

class TemplateRendering:
    def render_template(self, template_name, variables={}):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        template_path = dir_path+"/templates"
        template_dirs = [ template_path ]

        env = Environment(
            loader = FileSystemLoader(template_dirs),
            auto_reload=True,
            autoescape=False
        )
        env.globals['S'] = '/static'

        try:
            template = env.get_template(template_name)
        except TemplateNotFound:
            raise TemplateNotFound(template_name)

        content = template.render(variables)

        return content

 
class IndexPageHandler(tornado.web.RequestHandler, TemplateRendering):
    def get(self):

        self.write(self.render_template("index.html"))


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r'/', IndexPageHandler),
            (r'/index.html', IndexPageHandler)
#            (r'/api*', apiHandler),
#            (r'/logs/(.*)',logsHandler),
#	    (r'/reports/(.*)',tornado.web.StaticFileHandler,{'path':"./reports/"})
        ]
 
        settings = {
            'template_path': 'templates',
            'static_path': 'static'
        }
        tornado.web.Application.__init__(self, handlers, **settings)
 
if __name__ == '__main__':   
    ws_app = Application()
    server = tornado.httpserver.HTTPServer(ws_app)
    server.listen(9090)
    tornado.ioloop.IOLoop.instance().start()













