'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GenerationHistoryItemDto } from '@/lib/dtos/dashboard.dto';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface GenerationHistoryProps {
  history: GenerationHistoryItemDto[];
}

export function GenerationHistory({ history }: GenerationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Generation History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.status === 'Success' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant={item.status === 'Success' ? 'default' : 'destructive'}>
                      {item.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(item.timestamp), 'PPp')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fitness Score</p>
                      <p className="font-medium">{item.fitness_score.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conflicts</p>
                      <p className="font-medium">{item.conflicts_count}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Generations</p>
                      <p className="font-medium">{item.generations_run}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Strategy</p>
                      <p className="font-medium">{item.strategy_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No generation history available</p>
        )}
      </CardContent>
    </Card>
  );
}

