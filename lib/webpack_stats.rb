# frozen_string_literal: true
require 'json'
class WebpackStats
  REGEXP = /(.+?)(?:-([0-9a-f]{20,}))?\.(\w+)/
  attr_reader :assets

  module Helper
    def compute_asset_path(source, options = {})
      if Rails.env.production?
        @_webpack_stats ||= WebpackStats.new(Rails.root.join('stats.json'))
      else
        @_webpack_stats = WebpackStats.new(Rails.root.join('stats.json'))
      end
      @_webpack_stats.assets[source] || super
    end
  end

  def initialize(path)
    stats = JSON.parse(IO.read(path))
    public_path = stats['publicPath']
    assets = stats['assets']
    @assets = {}
    assets.each do |asset|
      full_name, name, hash, ext = REGEXP.match(asset['name']).to_a
      @assets["#{name}.#{ext}"] = File.join(stats['publicPath'], full_name)
    end
  end
end
