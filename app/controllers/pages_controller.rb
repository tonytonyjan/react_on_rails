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
        return { status: 500, error: error }
      } else if (redirectLocation) {
        return {status: 302, location: redirectLocation}
      } else if (renderProps) {
        return {
          status: renderProps.routes[2].path == '*' ? 404 : 200,
          body: ReactDOMServer.renderToString(
            React.createElement(ReactRouter.RouterContext, renderProps)
          )
        }
      }
    EOS
    case result['status']
    when 500 then head 500
    when 302
      redirect_to result['location'].pathname + result['location'].search
    when 200, 404
      render text: render_full_page(result['body']), status: result['status']
    end
  end

  def render_full_page(html)
    <<~EOS
      <!DOCTYPE html>
      <html>
        <head>
          <title>React on Rails</title>
          #{helpers.csrf_meta_tags}
        </head>
        <body>
          <div id="app">#{html}</div>
          #{helpers.javascript_include_tag '/assets/client'}
        </body>
      </html>
    EOS
  end
end
