import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: any;
  public barChartOptions: any;
  public lineChartOptions: any;
  public scatterChartOptions: any;
  public selectedEntity: string = 'tasks'; // Default to show tasks
  public isLoading: boolean = true;
  public errorMessage: string = '';
  public displayName: string = 'Tâches'; // Default display name

  private entityDisplayNames: { [key: string]: string } = {
    'tasks': 'Tâches',
    'projects': 'Projets',
    'devis': 'Devis',
    'elementdevis': 'Éléments de devis'
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.updateCharts();
  }

  onEntityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedEntity = target.value;
      this.displayName = this.entityDisplayNames[this.selectedEntity]; // Update display name
      this.updateCharts();
    }
  }

  updateCharts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    let observable;
    switch (this.selectedEntity) {
      case 'tasks':
        observable = this.dashboardService.getTaskStatusDistribution();
        break;
      case 'projects':
        observable = this.dashboardService.getProjectStatusDistribution();
        break;
      case 'devis':
        observable = this.dashboardService.getDevisStatusDistribution();
        break;
      case 'elementdevis':
        observable = this.dashboardService.getElementdevisStatusDistribution();
        break;
      default:
        this.isLoading = false;
        this.errorMessage = 'Invalid entity selected';
        return;
    }

    if (observable) {
      observable.subscribe(
        data => {
          const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

          this.pieChartOptions = this.createPieChartOptions(chartData, this.displayName);
          this.barChartOptions = this.createBarChartOptions(chartData);
          this.lineChartOptions = this.createLineChartOptions(chartData);
          this.scatterChartOptions = this.createScatterChartOptions(chartData);

          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load data. Please try again later.';
        }
      );
    }
  }

  createPieChartOptions(data: any, displayName: string): any {
    return {
      title: {
        text: `pie Chart`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: displayName,
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  createBarChartOptions(data: any): any {
    const categories = data.map((item: any) => item.name);
    return {
      title: {
        text: `Bar Chart`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: data.map((item: any) => item.value)
        }
      ]
    };
  }

  createLineChartOptions(data: any): any {
    const categories = data.map((item: any) => item.name);
    return {
      title: {
        text: `Line Chart`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: data.map((item: any) => item.value)
        }
      ]
    };
  }

  createScatterChartOptions(data: any): any {
    return {
      title: {
        text: `Scatter Chart`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'scatter',
          data: data.map((item: any, index: number) => [index, item.value])
        }
      ]
    };
  }
}
