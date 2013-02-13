# A Jekyll Liquid tag to insert image in post
#
#     {% img_insert img:, title:, new: %}
 
module Jekyll
  class ImageInsertTag < Liquid::Tag
 
    def initialize(tag_name, params, tokens)
      super          
      # process parameters
      @params = Hash[*params.split(/(?:: *)|(?:, *)/)]
      @img = @params['img']
      @title = @params['title']
      @new = @params['new']
    end
 
    def render(context)
      "<img src=/img/posts/#{@img}>"
    end
  end
end
 
Liquid::Template.register_tag('img_insert', Jekyll::ImageInsertTag)