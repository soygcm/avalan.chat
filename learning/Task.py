from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone

# class Comment(BaseModel):
#     text: str = Field(..., description="Comment or progress update")
#     timestamp: datetime = Field(default_factory=datetime.utcnow)

class Task(BaseModel):
    """Task model for tracking items and their subtasks."""  # This docstring will be used for the schema title

    title: str = Field(..., description="Title of the task")
    description: Optional[str] = Field(None, description="Detailed description of the task")
    deadline: Optional[datetime] = Field(None, description="Deadline for task completion")
    completed: bool = Field(default=False, description="Task completion status")
    priority: Optional[int] = Field(None, description="Task priority, e.g., 1-5")
    # children: List["Task"] #= Field(default_factory=list, description="Subtasks")
    # comments: List[Comment] = Field(default_factory=list, description="Progress updates or comments")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="Timestamp when the task was created")

    # class Config:
    #     from_attributes = True
    #     title = "Task"  # Add this line to set the schema title
    #     json_schema_extra = {
    #         "title": "Task"  # Alternative way to set the title
    #     }

class Song(BaseModel):
    """Data model for a song."""

    title: str
    length_seconds: int


class Album(BaseModel):
    """Data model for an album."""

    name: str
    artist: str
    songs: List[Song]

def example():
    task = Task(
        title="Complete Project Proposal",
        description="Draft and submit the project proposal",
        deadline=datetime(2025, 4, 1, 12, 0),
        priority=2,
        children=[
            Task(title="Research Background"),
            Task(title="Outline Proposal"),
        ],
        # comments=[Comment(text="Started research phase")]
    )

    print(task.model_dump_json(indent=2))