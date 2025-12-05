class TodosController < ApplicationController

    before_action :set_todo, only: %i[show update destroy]
    
    def index
        todos = Todo.all
        render json: todos
    end

    def show
        render json: @todo
    end

    def update
        if @todo.update(todo_params)
            render json: @todo, status: 200
        else
            render json: @todo.errors, status: :unprocessable_entity
        end
    end

    def create
        @todo = Todo.new(todo_params)
        puts "Here 1##########"
        if @todo.save
            render json: @todo, status: 200
        else
            render json: @todo.errors, status: :unprocessable_entity
        end
    end
    
    def destroy
        @todo.destroy!
        head :no_content
    end

    private
      
      def set_todo
        begin
          @todo = Todo.find(params.expect(:id))
        rescue => e
          render json: e.message, status: :not_found
        end
      end

      def todo_params
        #puts "#### 22222222"
        params.permit(:title, :description, :isCompleted)
        
      end
end