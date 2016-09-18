class PagesController < ApplicationController
  def home
    context = ExecJS.compile(File.read('./public/assets/server.js'))
    result = context.exec <<~EOS
      var error, redirectLocation, renderProps
      ReactRouter.match({routes: routes.default, location: #{request.path.to_json}}, function(_error, _redirectLocation, _renderProps){
        error = _error
        redirectLocation = _redirectLocation
        renderProps = _renderProps
      })
      if (error) {
        return [500, error]
      } else if (redirectLocation) {
        return [302, redirectLocation]
      } else if (renderProps) {
        return [200, ReactDOMServer.renderToString(
          React.createElement(ReactRouter.RouterContext, renderProps)
        )]
      }
    EOS
    case result.first
    when 500 then head 500
    when 302 then redirect_to result.last.pathname + result.last.search
    when 200 then render text: render_full_page(result.last)
    end
  end

  def render_full_page(html)
    <<~EOS
      <!DOCTYPE html>
      <html>
        <head>
          <title>React on Rails</title>
          #{ helpers.csrf_meta_tags }
        </head>
        <body>
          <div id="app">#{html}</div>
          #{ helpers.javascript_include_tag '/assets/client' }
        </body>
      </html>
    EOS
  end
end
